<template>
  <transition name="slide">
    <div class="cart-overlay" v-if="isOpen" @click.self="closeCart">
      <div class="cart-sidebar">
        <div class="cart-header">
          <h3>Tu Carrito</h3>
          <button class="close-btn" @click="closeCart">✕</button>
        </div>

        <div class="cart-body" v-if="items.length > 0">
          <div class="cart-item" v-for="(item, index) in items" :key="index">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" @error="(e) => e.target.style.display='none'" />
            </div>
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p class="item-size" v-if="item.selectedSize">Talla: {{ item.selectedSize }}</p>
              <div class="item-controls">
                <div class="qty-controls">
                  <button @click="updateQuantity(index, item.quantity - 1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="updateQuantity(index, item.quantity + 1)">+</button>
                </div>
                <span class="item-price">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <button class="remove-btn" @click="removeItem(index)">🗑</button>
          </div>
        </div>

        <div class="cart-empty" v-else>
          <div class="empty-icon">🚲</div>
          <p>Tu carrito está vacío</p>
          <p class="empty-hint">Pregunta a nuestro asistente de IA para encontrar tu bici ideal</p>
        </div>

        <div class="cart-footer" v-if="items.length > 0">
          <div class="cart-total">
            <span>Total</span>
            <span class="price">{{ formatPrice(totalPrice) }}</span>
          </div>
          <button class="btn-commencal btn-primary btn-lg" style="width:100%" @click="checkout">
            Finalizar Compra
          </button>
          <button class="btn-commencal btn-secondary btn-sm" style="width:100%;margin-top:8px" @click="closeCart">
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- Checkout Modal -->
  <transition name="fade">
    <div class="checkout-overlay" v-if="showCheckout" @click.self="showCheckout = false">
      <div class="checkout-modal">
        <div class="checkout-header">
          <h2>Checkout</h2>
          <button class="close-btn" @click="showCheckout = false">✕</button>
        </div>

        <div class="checkout-body" v-if="!orderConfirmed">
          <div class="checkout-summary">
            <h4>Resumen del pedido</h4>
            <div class="summary-items">
              <div class="summary-item" v-for="item in items" :key="item.id">
                <span>{{ item.name }} <small v-if="item.selectedSize">({{ item.selectedSize }})</small> ×{{ item.quantity }}</span>
                <span>{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span class="price">{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>

          <form @submit.prevent="confirmOrder" class="checkout-form">
            <h4>Datos de envío</h4>
            <div class="form-row">
              <input type="text" placeholder="Nombre completo" required v-model="form.name" />
            </div>
            <div class="form-row">
              <input type="email" placeholder="Email" required v-model="form.email" />
            </div>
            <div class="form-row">
              <input type="tel" placeholder="Teléfono" required v-model="form.phone" />
            </div>
            <div class="form-row">
              <input type="text" placeholder="Dirección de envío" required v-model="form.address" />
            </div>
            <div class="form-row two-cols">
              <input type="text" placeholder="Ciudad" required v-model="form.city" />
              <input type="text" placeholder="Código Postal" required v-model="form.zip" />
            </div>
            <button type="submit" class="btn-commencal btn-primary btn-lg" style="width:100%;margin-top:16px">
              Confirmar Pedido — {{ formatPrice(totalPrice) }}
            </button>
          </form>
        </div>

        <div class="checkout-success" v-else>
          <div class="success-icon">✓</div>
          <h3>¡Pedido Confirmado!</h3>
          <p>Gracias por tu compra. Recibirás un email de confirmación en breve.</p>
          <p class="order-number">Pedido #CMC-{{ Math.floor(Math.random() * 90000) + 10000 }}</p>
          <button class="btn-commencal btn-primary" @click="finishOrder">Volver a la tienda</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCart } from '../stores/cartStore.js'

const { items, isOpen, totalPrice, closeCart, removeItem, updateQuantity, clearCart } = useCart()

const showCheckout = ref(false)
const orderConfirmed = ref(false)
const form = reactive({ name: '', email: '', phone: '', address: '', city: '', zip: '' })

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function checkout() {
  closeCart()
  showCheckout.value = true
}

function confirmOrder() {
  orderConfirmed.value = true
}

function finishOrder() {
  clearCart()
  showCheckout.value = false
  orderConfirmed.value = false
}

defineExpose({ checkout })
</script>

<style scoped>
/* Slide transition */
.slide-enter-active, .slide-leave-active { transition: all var(--transition-base); }
.slide-enter-from, .slide-leave-to { opacity: 0; }
.slide-enter-from .cart-sidebar, .slide-leave-to .cart-sidebar { transform: translateX(100%); }

.fade-enter-active, .fade-leave-active { transition: all var(--transition-base); }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.cart-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6); z-index: 1100;
  display: flex; justify-content: flex-end;
}

.cart-sidebar {
  width: 420px; max-width: 90vw; height: 100%;
  background: var(--cc-dark); border-left: 1px solid var(--cc-gray-border);
  display: flex; flex-direction: column;
  animation: slideInRight 0.3s ease;
}

.cart-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid var(--cc-gray-border);
}

.cart-header h3 {
  font-family: var(--font-heading); font-size: 1.1rem;
  text-transform: uppercase; letter-spacing: 0.1em;
}

.close-btn {
  background: none; border: none; color: var(--cc-gray);
  font-size: 1.2rem; cursor: pointer; padding: 4px 8px;
  transition: color var(--transition-fast);
}
.close-btn:hover { color: var(--cc-white); }

.cart-body {
  flex: 1; overflow-y: auto; padding: 16px 24px;
}

.cart-item {
  display: flex; gap: 12px; padding: 16px 0;
  border-bottom: 1px solid var(--cc-gray-border);
  position: relative;
}

.item-image {
  width: 72px; height: 72px; flex-shrink: 0;
  background: var(--cc-dark-3); overflow: hidden;
}

.item-image img {
  width: 100%; height: 100%; object-fit: cover;
}

.item-info { flex: 1; }
.item-info h4 {
  font-family: var(--font-heading); font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 4px;
}

.item-size { color: var(--cc-gray); font-size: 0.75rem; margin-bottom: 8px; }

.item-controls {
  display: flex; align-items: center; justify-content: space-between;
}

.qty-controls {
  display: flex; align-items: center; gap: 0; border: 1px solid var(--cc-gray-border);
}

.qty-controls button {
  background: none; border: none; color: var(--cc-white); padding: 4px 10px;
  cursor: pointer; font-size: 0.9rem;
}
.qty-controls button:hover { background: var(--cc-dark-3); }

.qty-controls span {
  padding: 4px 12px; font-size: 0.85rem; font-weight: 600;
  border-left: 1px solid var(--cc-gray-border); border-right: 1px solid var(--cc-gray-border);
}

.item-price { font-family: var(--font-heading); font-weight: 700; color: var(--cc-yellow); font-size: 0.9rem; }

.remove-btn {
  background: none; border: none; cursor: pointer; font-size: 0.8rem;
  opacity: 0.5; transition: opacity var(--transition-fast);
  position: absolute; top: 16px; right: 0;
}
.remove-btn:hover { opacity: 1; }

.cart-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px;
  color: var(--cc-gray);
}

.empty-icon { font-size: 3rem; }
.empty-hint { font-size: 0.8rem; text-align: center; padding: 0 32px; }

.cart-footer { padding: 20px 24px; border-top: 1px solid var(--cc-gray-border); }

.cart-total {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
  font-family: var(--font-heading); font-size: 1rem;
  text-transform: uppercase; letter-spacing: 0.05em;
}

/* Checkout Modal */
.checkout-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8); z-index: 1200;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

.checkout-modal {
  background: var(--cc-dark); border: 1px solid var(--cc-gray-border);
  width: 580px; max-width: 100%; max-height: 90vh; overflow-y: auto;
}

.checkout-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px; border-bottom: 1px solid var(--cc-gray-border);
}

.checkout-header h2 {
  font-size: 1.2rem; text-transform: uppercase; letter-spacing: 0.1em;
}

.checkout-body { padding: 24px; }

.checkout-summary {
  margin-bottom: 32px; padding-bottom: 20px;
  border-bottom: 1px solid var(--cc-gray-border);
}

.checkout-summary h4, .checkout-form h4 {
  font-family: var(--font-heading); font-size: 0.85rem;
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-bottom: 16px; color: var(--cc-gray);
}

.summary-item {
  display: flex; justify-content: space-between;
  padding: 6px 0; font-size: 0.85rem;
}

.summary-total {
  display: flex; justify-content: space-between;
  padding-top: 12px; margin-top: 12px;
  border-top: 1px solid var(--cc-gray-border);
  font-family: var(--font-heading); font-size: 1rem;
  text-transform: uppercase;
}

.form-row { margin-bottom: 12px; }
.form-row.two-cols { display: flex; gap: 12px; }

.form-row input {
  width: 100%; padding: 12px 16px;
  background: var(--cc-dark-3); border: 1px solid var(--cc-gray-border);
  color: var(--cc-white); font-family: var(--font-primary); font-size: 0.9rem;
  transition: border-color var(--transition-fast); outline: none;
}

.form-row input:focus {
  border-color: var(--cc-yellow);
}

.form-row input::placeholder { color: var(--cc-gray); }

.checkout-success {
  padding: 48px 24px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}

.success-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--cc-yellow); color: var(--cc-black);
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; font-weight: 700;
}

.checkout-success h3 { color: var(--cc-yellow); }
.checkout-success p { color: var(--cc-gray); }
.order-number {
  font-family: var(--font-mono); font-size: 0.9rem;
  color: var(--cc-white) !important; font-weight: 600;
}
</style>
