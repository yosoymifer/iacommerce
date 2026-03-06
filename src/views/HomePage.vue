<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-badge">NUEVA TEMPORADA 2026</div>
        <h1 class="hero-title">THE ART OF<br/>MOVEMENT</h1>
        <p class="hero-subtitle">Descubre la gama completa de mountain bikes diseñadas en Andorra desde 2000. Enduro, Trail, Downhill y E-Bikes.</p>
        <div class="hero-actions">
          <router-link to="/bikes" class="btn-commencal btn-primary btn-lg">
            Ver Todas las Bikes
          </router-link>
          <router-link to="/category/enduro" class="btn-commencal btn-secondary btn-lg">
            Enduro
          </router-link>
        </div>
        <div class="hero-ai-hint">
          <span class="ai-dot"></span>
          Pregunta a nuestro asistente de IA →
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Elige Tu Disciplina</h2>
          <p>Cada categoría diseñada para un estilo de riding diferente</p>
        </div>
        <div class="categories-grid">
          <router-link
            v-for="cat in bikeCategories"
            :key="cat.id"
            :to="`/category/${cat.id}`"
            class="category-card"
          >
            <div class="cat-icon">{{ cat.icon }}</div>
            <h3>{{ cat.name }}</h3>
            <p>{{ cat.description }}</p>
            <span class="cat-count">{{ getCategoryCount(cat.id) }} modelos</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Bikes Destacadas</h2>
          <p>Las favoritas de la temporada</p>
        </div>
        <div class="product-grid">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
        <div class="section-cta">
          <router-link to="/bikes" class="btn-commencal btn-secondary">Ver Todo el Catálogo</router-link>
        </div>
      </div>
    </section>

    <!-- Accessories Banner -->
    <section class="accessories-banner section">
      <div class="container">
        <div class="acc-content">
          <h2>Equipamiento Rider</h2>
          <p>Cascos, ropa técnica y repuestos para completar tu setup</p>
          <div class="acc-actions">
            <router-link to="/category/accessories" class="btn-commencal btn-primary">Accesorios</router-link>
            <router-link to="/category/clothing" class="btn-commencal btn-secondary">Ropa</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Section -->
    <section class="section ai-section">
      <div class="container">
        <div class="ai-promo">
          <div class="ai-promo-content">
            <div class="ai-badge">🤖 NUEVO</div>
            <h2>Asistente de IA</h2>
            <p>¿No sabes qué bici elegir? Nuestro asistente inteligente te ayuda a encontrar la bici perfecta según tu estilo, nivel y presupuesto. También puede recomendarte accesorios y completar tu compra sin salir del chat.</p>
            <ul class="ai-features">
              <li>✓ Recomendaciones personalizadas</li>
              <li>✓ Cross-selling inteligente</li>
              <li>✓ Compra directa desde el chat</li>
              <li>✓ Conocimiento experto del catálogo</li>
            </ul>
          </div>
          <div class="ai-promo-visual">
            <div class="mock-chat">
              <div class="mock-msg assistant">¡Hola! 👋 Soy el asistente de COMMENCAL. ¿En qué puedo ayudarte?</div>
              <div class="mock-msg user">Quiero una bici para enduro</div>
              <div class="mock-msg assistant">¡Genial! Te recomiendo la META SX V5 RIDE 🤘</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { products, categories, getProductsByCategory } from '../data/products.js'

const bikeCategories = categories.filter(c => ['enduro', 'trail', 'downhill', 'ebike'].includes(c.id))

const featuredProducts = computed(() => {
  return [
    products.find(p => p.id === 1),  // META SX V5
    products.find(p => p.id === 4),  // CLASH RIDE
    products.find(p => p.id === 6),  // TEMPO RIDE
    products.find(p => p.id === 8),  // SUPREME DH
    products.find(p => p.id === 9),  // META POWER
    products.find(p => p.id === 14), // JERSEY
  ].filter(Boolean)
})

function getCategoryCount(catId) {
  return getProductsByCategory(catId).length
}
</script>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%),
    url('https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1920&q=80') center/cover;
}

.hero-gradient {
  position: absolute;
  bottom: 0; left: 0; right: 0; height: 200px;
  background: linear-gradient(transparent, var(--cc-black));
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 120px;
  padding-bottom: 80px;
}

.hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--cc-yellow);
  color: var(--cc-black);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.95;
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease 0.1s both;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--cc-gray);
  max-width: 550px;
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease 0.2s both;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease 0.3s both;
}

.hero-ai-hint {
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cc-gray);
  font-size: 0.85rem;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.ai-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--cc-green);
  animation: pulse 2s infinite;
}

/* ===== Categories ===== */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.category-card {
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  padding: 32px 24px;
  text-align: center;
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.category-card:hover {
  border-color: var(--cc-yellow);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
  color: var(--cc-white);
}

.cat-icon {
  font-size: 2.5rem;
  margin-bottom: 4px;
}

.category-card h3 {
  font-size: 1.1rem;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.category-card p {
  color: var(--cc-gray);
  font-size: 0.85rem;
}

.cat-count {
  font-size: 0.7rem;
  color: var(--cc-yellow);
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ===== Section CTA ===== */
.section-cta {
  text-align: center;
  margin-top: 48px;
}

/* ===== Accessories Banner ===== */
.accessories-banner {
  background:
    linear-gradient(135deg, rgba(255, 209, 0, 0.08), transparent);
  border-top: 1px solid var(--cc-gray-border);
  border-bottom: 1px solid var(--cc-gray-border);
}

.acc-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.acc-content h2 {
  margin-bottom: 12px;
}

.acc-content p {
  color: var(--cc-gray);
  margin-bottom: 28px;
}

.acc-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ===== AI Section ===== */
.ai-section {
  background: linear-gradient(180deg, var(--cc-black), var(--cc-dark));
}

.ai-promo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.ai-badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(255, 209, 0, 0.15);
  color: var(--cc-yellow);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
  border: 1px solid rgba(255, 209, 0, 0.3);
}

.ai-promo-content h2 { margin-bottom: 16px; }
.ai-promo-content p {
  color: var(--cc-gray);
  line-height: 1.7;
  margin-bottom: 20px;
}

.ai-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ai-features li {
  font-size: 0.9rem;
  color: var(--cc-white);
}

/* Mock Chat */
.mock-chat {
  background: var(--cc-dark);
  border: 1px solid var(--cc-gray-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mock-msg {
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 0.83rem;
  max-width: 85%;
}

.mock-msg.assistant {
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  align-self: flex-start;
}

.mock-msg.user {
  background: var(--cc-yellow);
  color: var(--cc-black);
  align-self: flex-end;
}

@media (max-width: 768px) {
  .ai-promo {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
}
</style>
