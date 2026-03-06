<template>
  <div class="product-card" @click="goToProduct">
    <div class="card-image">
      <img :src="product.image" :alt="product.name" @error="handleImgError" loading="lazy" />
      <div class="card-badges">
        <span class="badge-category">{{ product.category }}</span>
        <span class="badge-type" v-if="product.type !== 'bike'">{{ product.type === 'accessory' ? 'Accesorio' : 'Ropa' }}</span>
      </div>
      <div class="card-overlay">
        <button class="btn-commencal btn-primary btn-sm" @click.stop="quickAdd">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Añadir
        </button>
      </div>
    </div>
    <div class="card-info">
      <h3 class="card-name">{{ product.name }}</h3>
      <p class="card-desc">{{ product.shortDesc }}</p>
      <div class="card-bottom">
        <span class="price price-small">{{ formatPrice(product.price) }}</span>
        <span class="card-activity" v-if="product.travel">{{ product.travel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cartStore.js'

const props = defineProps({ product: Object })
const router = useRouter()
const { addItem } = useCart()

function goToProduct() {
  router.push(`/product/${props.product.slug}`)
}

function quickAdd() {
  const defaultSize = props.product.sizes ? props.product.sizes[1] || props.product.sizes[0] : null
  addItem(props.product.id, defaultSize)
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price)
}

function handleImgError(e) {
  e.target.style.display = 'none'
  e.target.parentElement.classList.add('img-error')
}
</script>

<style scoped>
.product-card {
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  cursor: pointer;
  transition: all var(--transition-base);
  overflow: hidden;
  animation: fadeInUp 0.5s ease forwards;
}

.product-card:hover {
  border-color: var(--cc-yellow);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--cc-dark-3);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .card-image img {
  transform: scale(1.05);
}

.card-image.img-error {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--cc-gray);
  text-transform: uppercase;
}

.card-image.img-error::after {
  content: '🚲 COMMENCAL';
  font-size: 1rem;
}

.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all var(--transition-base);
}

.product-card:hover .card-overlay {
  opacity: 1;
  transform: translateY(0);
}

.card-info {
  padding: 16px;
}

.card-name {
  font-size: 0.95rem;
  margin-bottom: 6px;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card-desc {
  color: var(--cc-gray);
  font-size: 0.8rem;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-activity {
  font-size: 0.75rem;
  color: var(--cc-gray);
  font-family: var(--font-mono);
}
</style>
