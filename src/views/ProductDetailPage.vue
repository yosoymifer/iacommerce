<template>
  <div class="product-detail-page" v-if="product">
    <div class="container">
      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <router-link to="/">Inicio</router-link>
        <span>/</span>
        <router-link :to="`/category/${product.category}`">{{ categoryName }}</router-link>
        <span>/</span>
        <span>{{ product.name }}</span>
      </div>

      <!-- Main Layout -->
      <div class="detail-grid">
        <!-- Image -->
        <div class="detail-image">
          <div class="image-main">
            <img :src="product.image" :alt="product.name" @error="handleImgError" />
          </div>
          <div class="image-badges">
            <span class="badge-category">{{ product.category }}</span>
            <span class="badge-type" v-if="product.type !== 'bike'">
              {{ product.type === 'accessory' ? 'Accesorio' : 'Ropa' }}
            </span>
          </div>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <h1 class="detail-name">{{ product.name }}</h1>
          <div class="detail-price price">{{ formatPrice(product.price) }}</div>
          <p class="detail-short-desc">{{ product.shortDesc }}</p>

          <!-- Highlights -->
          <div class="detail-highlights">
            <div class="highlight-item" v-for="h in product.highlights" :key="h">
              <span class="highlight-check">✓</span>
              {{ h }}
            </div>
          </div>

          <!-- Quick Specs (bikes only) -->
          <div class="detail-specs-quick" v-if="product.type === 'bike'">
            <div class="spec-item" v-if="product.travel">
              <span class="spec-label">Recorrido</span>
              <span class="spec-value">{{ product.travel }}</span>
            </div>
            <div class="spec-item" v-if="product.wheelSize">
              <span class="spec-label">Ruedas</span>
              <span class="spec-value">{{ product.wheelSize }}</span>
            </div>
            <div class="spec-item" v-if="product.weight">
              <span class="spec-label">Peso</span>
              <span class="spec-value">{{ product.weight }}</span>
            </div>
            <div class="spec-item" v-if="product.motor">
              <span class="spec-label">Motor</span>
              <span class="spec-value">{{ product.motor }}</span>
            </div>
          </div>

          <!-- Size Selector -->
          <div class="size-selector" v-if="product.sizes && product.sizes.length">
            <label>Talla</label>
            <div class="size-options">
              <button
                v-for="size in product.sizes"
                :key="size"
                class="size-btn"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="detail-actions">
            <button class="btn-commencal btn-primary btn-lg" @click="addToCart" style="flex:1">
              🛒 Añadir al Carrito
            </button>
          </div>

          <div class="detail-meta">
            <div class="meta-item" v-if="product.riderLevel">
              <span class="meta-label">Nivel:</span> {{ product.riderLevel }}
            </div>
            <div class="meta-item" v-if="product.activity">
              <span class="meta-label">Actividad:</span> {{ product.activity }}
            </div>
          </div>
        </div>
      </div>

      <!-- Full Description -->
      <div class="detail-description section">
        <h2>Descripción</h2>
        <p>{{ product.description }}</p>
      </div>

      <!-- Full Specs Table (bikes only) -->
      <div class="detail-specs section" v-if="product.type === 'bike'">
        <h2>Especificaciones</h2>
        <table class="specs-table">
          <tbody>
            <tr v-if="product.frame"><td>Cuadro</td><td>{{ product.frame }}</td></tr>
            <tr v-if="product.fork"><td>Horquilla</td><td>{{ product.fork }}</td></tr>
            <tr v-if="product.shock"><td>Amortiguador</td><td>{{ product.shock }}</td></tr>
            <tr v-if="product.drivetrain"><td>Transmisión</td><td>{{ product.drivetrain }}</td></tr>
            <tr v-if="product.brakes"><td>Frenos</td><td>{{ product.brakes }}</td></tr>
            <tr v-if="product.wheelSize"><td>Ruedas</td><td>{{ product.wheelSize }}</td></tr>
            <tr v-if="product.travel"><td>Recorrido</td><td>{{ product.travel }}</td></tr>
            <tr v-if="product.weight"><td>Peso</td><td>{{ product.weight }}</td></tr>
            <tr v-if="product.motor"><td>Motor</td><td>{{ product.motor }}</td></tr>
            <tr v-if="product.battery"><td>Batería</td><td>{{ product.battery }}</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Cross-Sell -->
      <div class="cross-sell section" v-if="crossSellProducts.length">
        <div class="section-title">
          <h2>También Te Puede Interesar</h2>
          <p>Productos recomendados para complementar tu compra</p>
        </div>
        <div class="product-grid">
          <ProductCard v-for="p in crossSellProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div class="not-found" v-else>
    <div class="container" style="text-align:center;padding:120px 0;">
      <h2>Producto no encontrado</h2>
      <p style="color:var(--cc-gray);margin:16px 0 32px;">Este producto no existe o ha sido removido.</p>
      <router-link to="/bikes" class="btn-commencal btn-primary">Ver Catálogo</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { getProductBySlug, getCrossSellProducts, categories } from '../data/products.js'
import { useCart } from '../stores/cartStore.js'

const props = defineProps({ slug: String })
const route = useRoute()
const { addItem } = useCart()

const selectedSize = ref(null)

const product = computed(() => {
  const slug = props.slug || route.params.slug
  return getProductBySlug(slug)
})

const categoryName = computed(() => {
  if (!product.value) return ''
  const cat = categories.find(c => c.id === product.value.category)
  return cat ? cat.name : product.value.category
})

const crossSellProducts = computed(() => {
  if (!product.value) return []
  return getCrossSellProducts(product.value.id)
})

watch(product, (p) => {
  if (p && p.sizes && p.sizes.length) {
    selectedSize.value = p.sizes[1] || p.sizes[0]
  }
}, { immediate: true })

function addToCart() {
  if (product.value) {
    addItem(product.value.id, selectedSize.value)
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function handleImgError(e) {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.product-detail-page {
  padding-top: 100px;
  min-height: 100vh;
}

.breadcrumbs {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 32px; font-size: 0.8rem; color: var(--cc-gray);
}
.breadcrumbs a { color: var(--cc-gray); }
.breadcrumbs a:hover { color: var(--cc-yellow); }

.detail-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

/* Image */
.detail-image { position: relative; }

.image-main {
  aspect-ratio: 4/3;
  background: var(--cc-dark-2);
  overflow: hidden;
  border: 1px solid var(--cc-gray-border);
}

.image-main img {
  width: 100%; height: 100%; object-fit: cover;
}

.image-badges {
  position: absolute; top: 16px; left: 16px;
  display: flex; gap: 8px;
}

/* Info */
.detail-name {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  margin-bottom: 12px;
}

.detail-price {
  font-size: 2rem;
  margin-bottom: 16px;
}

.detail-short-desc {
  color: var(--cc-gray);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
}

.detail-highlights {
  display: flex; flex-direction: column; gap: 8px;
  margin-bottom: 24px; padding: 20px;
  background: var(--cc-dark-2); border: 1px solid var(--cc-gray-border);
}

.highlight-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.9rem;
}

.highlight-check {
  color: var(--cc-yellow); font-weight: 700;
}

.detail-specs-quick {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; margin-bottom: 24px;
}

.spec-item {
  display: flex; flex-direction: column; gap: 4px;
  padding: 12px; background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
}

.spec-label {
  font-size: 0.7rem; color: var(--cc-gray);
  text-transform: uppercase; letter-spacing: 0.08em;
  font-family: var(--font-heading);
}

.spec-value {
  font-size: 0.95rem; font-weight: 600;
  color: var(--cc-white);
}

/* Size Selector */
.size-selector {
  margin-bottom: 24px;
}

.size-selector label {
  display: block; margin-bottom: 10px;
  font-family: var(--font-heading); font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--cc-gray);
}

.size-options {
  display: flex; gap: 8px;
}

.size-btn {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  background: var(--cc-dark-2); border: 1px solid var(--cc-gray-border);
  color: var(--cc-white); font-family: var(--font-heading);
  font-size: 0.85rem; font-weight: 700; cursor: pointer;
  transition: all var(--transition-fast);
}

.size-btn:hover { border-color: var(--cc-yellow); }

.size-btn.active {
  background: var(--cc-yellow); color: var(--cc-black);
  border-color: var(--cc-yellow);
}

/* Actions */
.detail-actions {
  display: flex; gap: 12px; margin-bottom: 24px;
}

.detail-meta {
  display: flex; flex-direction: column; gap: 6px;
  padding-top: 16px; border-top: 1px solid var(--cc-gray-border);
}

.meta-item { font-size: 0.85rem; color: var(--cc-gray); }
.meta-label { color: var(--cc-white); font-weight: 600; }

/* Description */
.detail-description p {
  color: var(--cc-gray); line-height: 1.8;
  max-width: 800px; font-size: 1rem;
}

/* Specs Table */
.specs-table {
  width: 100%; max-width: 700px;
  border-collapse: collapse;
}

.specs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--cc-gray-border);
  font-size: 0.9rem;
}

.specs-table td:first-child {
  font-family: var(--font-heading); font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.03em;
  font-size: 0.8rem; color: var(--cc-gray); width: 180px;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .detail-specs-quick {
    grid-template-columns: 1fr;
  }
}
</style>
