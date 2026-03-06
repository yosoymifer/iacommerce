<template>
  <div class="ai-chat-wrapper">
    <!-- Floating Button -->
    <button class="chat-fab" @click="toggleChat" :class="{ active: isOpen }">
      <span class="fab-icon" v-if="!isOpen">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </span>
      <span class="fab-icon" v-else>✕</span>
      <span class="fab-pulse" v-if="!isOpen && !hasInteracted"></span>
      <span class="fab-label" v-if="!isOpen && !hasInteracted">¿Necesitas ayuda?</span>
    </button>

    <!-- Chat Window -->
    <transition name="chat-slide">
      <div class="chat-window" v-if="isOpen">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-brand">
            <div class="brand-avatar">AI</div>
            <div>
              <div class="brand-name">COMMENCAL AI</div>
              <div class="brand-status">
                <span class="status-dot" :class="{ active: isConfigured }"></span>
                {{ isConfigured ? 'Online' : 'API key requerida' }}
              </div>
            </div>
          </div>
          <button class="chat-close" @click="toggleChat">✕</button>
        </div>



        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(msg, i) in messages" :key="i"
               class="message" :class="msg.role">
            <div class="msg-avatar" v-if="msg.role === 'assistant'">AI</div>
            <div class="msg-content">
              <div class="msg-text" v-html="renderMarkdown(msg.text)"></div>
              <!-- Product Cards in Chat -->
              <div class="msg-products" v-if="msg.products && msg.products.length">
                <div class="chat-product-card" v-for="p in msg.products" :key="p.id">
                  <div class="cp-image">
                    <img :src="p.image" :alt="p.name" @error="(e) => e.target.style.display='none'" />
                  </div>
                  <div class="cp-info">
                    <div class="cp-name">{{ p.name }}</div>
                    <div class="cp-price">{{ formatPrice(p.price) }}</div>
                    <div class="cp-actions">
                      <button class="btn-commencal btn-primary btn-sm" @click="addFromChat(p)">
                        🛒 Añadir
                      </button>
                      <button class="btn-commencal btn-dark btn-sm" @click="viewProduct(p)">
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="msg-actions" v-if="msg.actions && msg.actions.length">
                <button v-for="(action, ai) in msg.actions" :key="ai"
                        class="btn-commencal btn-primary btn-sm"
                        @click="executeAction(action)">
                  {{ action.type === 'checkout' ? '💳 Ir al Checkout' : `🛒 Añadir ${getProductName(action.productId)}` }}
                </button>
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div class="message assistant" v-if="isTyping">
            <div class="msg-avatar">AI</div>
            <div class="msg-content">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Suggestions -->
        <div class="chat-suggestions" v-if="messages.length <= 1">
          <button v-for="s in suggestions" :key="s" @click="sendSuggestion(s)">{{ s }}</button>
        </div>

        <!-- Input -->
        <div class="chat-input">
          <input
            v-model="inputText"
            @keyup.enter="sendMessage"
            placeholder="Escribe tu consulta..."
            :disabled="isTyping"
          />
          <button @click="sendMessage" :disabled="isTyping || !inputText.trim()" class="send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { aiService } from '../services/aiService.js'
import { useCart } from '../stores/cartStore.js'
import { getProductById } from '../data/products.js'

const router = useRouter()
const { addItem, getCartSummaryForAI, openCart } = useCart()

const isOpen = ref(false)
const isConfigured = ref(true) // Automatically configured via .env
const hasInteracted = ref(false)
const isTyping = ref(false)
const inputText = ref('')
const messagesContainer = ref(null)

const suggestions = [
  '¿Qué bici me recomiendas?',
  'Quiero empezar en enduro',
  'Busco una bici de trail',
  '¿Qué E-bike tienen?',
  '¿Cuál es la más barata?'
]

const messages = ref([
  {
    role: 'assistant',
    text: '¡Hola! 👋 Soy el asistente de **COMMENCAL IA**. Puedo ayudarte a encontrar la bici perfecta según tu estilo de riding, recomendar accesorios y equipamiento, ¡y hasta completar tu compra aquí mismo! 🚴‍♂️\n\n¿En qué puedo ayudarte?',
    products: [],
    actions: []
  }
])

function toggleChat() {
  isOpen.value = !isOpen.value
  hasInteracted.value = true
}



async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return

  messages.value.push({ role: 'user', text, products: [], actions: [] })
  inputText.value = ''
  isTyping.value = true
  await scrollToBottom()

  const cartSummary = getCartSummaryForAI()
  const response = await aiService.sendMessage(text, cartSummary)

  isTyping.value = false
  messages.value.push({
    role: 'assistant',
    text: response.text,
    products: response.products,
    actions: response.actions
  })

  // Auto-execute add_to_cart actions
  response.actions.forEach(action => {
    if (action.type === 'add_to_cart') {
      addItem(action.productId, action.size)
    }
  })

  await scrollToBottom()
}

function sendSuggestion(text) {
  inputText.value = text
  sendMessage()
}

function addFromChat(product) {
  const size = product.sizes ? product.sizes[1] || product.sizes[0] : null
  addItem(product.id, size)
  messages.value.push({
    role: 'assistant',
    text: `✅ **${product.name}** añadido al carrito. ${product.type === 'bike' ? '¿Te gustaría ver cascos o equipamiento para complementar tu compra?' : '¡Excelente elección!'}`,
    products: [],
    actions: []
  })
  scrollToBottom()
}

function viewProduct(product) {
  router.push(`/product/${product.slug}`)
  isOpen.value = false
}

function executeAction(action) {
  if (action.type === 'checkout') {
    openCart()
    isOpen.value = false // Cierra el chat para que el cliente vea el carrito íntegramente
  } else if (action.type === 'add_to_cart') {
    addItem(action.productId, action.size)
  }
}

function getProductName(id) {
  const p = getProductById(id)
  return p ? p.name : ''
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function renderMarkdown(text) {
  if (!text) return ''
  return marked.parse(text, { breaks: true })
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.ai-chat-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
  font-family: var(--font-primary);
}

/* ===== FAB Button ===== */
.chat-fab {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--cc-yellow);
  color: var(--cc-black);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  position: relative;
}

.chat-fab:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-glow);
}

.chat-fab.active {
  background: var(--cc-dark-2);
  color: var(--cc-white);
  border: 1px solid var(--cc-gray-border);
}

.fab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fab-pulse {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 16px;
  height: 16px;
  background: var(--cc-green);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.fab-label {
  position: absolute;
  right: 72px;
  white-space: nowrap;
  background: var(--cc-dark);
  color: var(--cc-white);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.5s ease;
  border: 1px solid var(--cc-gray-border);
}

.fab-label::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 6px solid var(--cc-dark);
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}

/* ===== Chat Window ===== */
.chat-slide-enter-active, .chat-slide-leave-active {
  transition: all 0.3s ease;
}
.chat-slide-enter-from, .chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.chat-window {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 420px;
  height: 600px;
  max-height: 75vh;
  background: var(--cc-dark);
  border: 1px solid var(--cc-gray-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

/* ===== Chat Header ===== */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--cc-dark-2);
  border-bottom: 1px solid var(--cc-gray-border);
}

.chat-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--cc-yellow);
  color: var(--cc-black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
}

.brand-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.brand-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  color: var(--cc-gray);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cc-gray);
}

.status-dot.active {
  background: var(--cc-green);
}

.chat-close {
  background: none;
  border: none;
  color: var(--cc-gray);
  font-size: 1.1rem;
  cursor: pointer;
  padding: 4px 8px;
  transition: color var(--transition-fast);
}
.chat-close:hover { color: var(--cc-white); }



/* ===== Messages ===== */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 8px;
  animation: fadeInUp 0.3s ease;
}

.message.user {
  flex-direction: row-reverse;
}

.msg-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--cc-yellow);
  color: var(--cc-black);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.6rem;
  flex-shrink: 0;
}

.msg-content {
  max-width: 85%;
}

.message.user .msg-content {
  align-items: flex-end;
}

.msg-text {
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  line-height: 1.5;
}

.message.assistant .msg-text {
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  border-radius: var(--radius-md) var(--radius-md) var(--radius-md) 4px;
}

.message.user .msg-text {
  background: var(--cc-yellow);
  color: var(--cc-black);
  border-radius: var(--radius-md) var(--radius-md) 4px var(--radius-md);
  margin-left: auto;
}

.msg-text :deep(p) { margin: 0 0 8px; }
.msg-text :deep(p:last-child) { margin-bottom: 0; }
.msg-text :deep(strong) { color: var(--cc-yellow); }
.message.user .msg-text :deep(strong) { color: var(--cc-black); }
.msg-text :deep(ul), .msg-text :deep(ol) { margin: 4px 0; padding-left: 18px; }
.msg-text :deep(li) { margin-bottom: 2px; font-size: 0.83rem; }

/* ===== Product Cards in Chat ===== */
.msg-products {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.chat-product-card {
  display: flex;
  gap: 10px;
  background: var(--cc-dark-3);
  border: 1px solid var(--cc-gray-border);
  border-radius: var(--radius-sm);
  padding: 10px;
  transition: border-color var(--transition-fast);
}

.chat-product-card:hover {
  border-color: var(--cc-yellow);
}

.cp-image {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  background: var(--cc-dark-2);
  overflow: hidden;
  border-radius: var(--radius-sm);
}

.cp-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cp-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cp-name {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.cp-price {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--cc-yellow);
  font-size: 0.85rem;
}

.cp-actions {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}

.cp-actions .btn-sm {
  padding: 4px 10px;
  font-size: 0.65rem;
}

/* ===== Action Buttons ===== */
.msg-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

/* ===== Typing Indicator ===== */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 14px;
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  border-radius: var(--radius-md);
  width: fit-content;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cc-gray);
  animation: typingBounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

/* ===== Suggestions ===== */
.chat-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 16px;
}

.chat-suggestions button {
  background: var(--cc-dark-3);
  border: 1px solid var(--cc-gray-border);
  color: var(--cc-white);
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  border-radius: 20px;
  transition: all var(--transition-fast);
  font-family: var(--font-primary);
}

.chat-suggestions button:hover {
  border-color: var(--cc-yellow);
  color: var(--cc-yellow);
}

/* ===== Chat Input ===== */
.chat-input {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--cc-gray-border);
  background: var(--cc-dark-2);
}

.chat-input input {
  flex: 1;
  padding: 10px 14px;
  background: var(--cc-dark);
  border: 1px solid var(--cc-gray-border);
  color: var(--cc-white);
  font-size: 0.85rem;
  border-radius: var(--radius-md);
  outline: none;
  font-family: var(--font-primary);
}

.chat-input input:focus {
  border-color: var(--cc-yellow);
}

.chat-input input::placeholder { color: var(--cc-gray); }

.send-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--cc-yellow);
  color: var(--cc-black);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ===== Responsive ===== */
@media (max-width: 480px) {
  .ai-chat-wrapper {
    bottom: 16px;
    right: 16px;
  }
  .chat-window {
    width: calc(100vw - 32px);
    height: calc(100vh - 100px);
    max-height: none;
    right: -8px;
    bottom: 64px;
    border-radius: var(--radius-md);
  }
  .fab-label { display: none; }
}
</style>
