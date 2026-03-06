<template>
  <div class="product-list-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="breadcrumbs">
          <router-link to="/">Inicio</router-link>
          <span>/</span>
          <span>{{ pageTitle }}</span>
        </div>
        <h1>{{ pageTitle }}</h1>
        <p class="page-desc" v-if="currentCategory">{{ currentCategory.description }}</p>
      </div>

      <!-- Filters -->
      <div class="filters-bar">
        <div class="filter-tabs">
          <button
            v-for="cat in availableCategories"
            :key="cat.id"
            class="filter-tab"
            :class="{ active: activeFilter === cat.id }"
            @click="setFilter(cat.id)"
          >
            {{ cat.icon }} {{ cat.name }}
          </button>
          <button
            class="filter-tab"
            :class="{ active: activeFilter === 'all' }"
            @click="setFilter('all')"
          >
            🔥 Todos
          </button>
        </div>
        <div class="results-count">
          {{ filteredProducts.length }} producto{{ filteredProducts.length !== 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Products Grid -->
      <div class="product-grid" v-if="filteredProducts.length">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div class="no-results" v-else>
        <p>No se encontraron productos en esta categoría.</p>
        <router-link to="/bikes" class="btn-commencal btn-primary">Ver todas las bikes</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products, categories, getProductsByCategory, getBikes, getAccessoriesAndClothing } from '../data/products.js'

const props = defineProps({
  category: String,
  filterType: String
})

const route = useRoute()
const activeFilter = ref('all')

const currentCategory = computed(() => {
  const catId = props.category || route.params.category
  return categories.find(c => c.id === catId) || null
})

const pageTitle = computed(() => {
  if (currentCategory.value) return currentCategory.value.name
  if (props.filterType === 'bike') return 'Todas las Bikes'
  return 'Catálogo'
})

const availableCategories = computed(() => {
  if (props.category || route.params.category) return []
  if (props.filterType === 'bike') {
    return categories.filter(c => ['enduro', 'trail', 'downhill', 'ebike'].includes(c.id))
  }
  return categories
})

const baseProducts = computed(() => {
  const catId = props.category || route.params.category
  if (catId) return getProductsByCategory(catId)
  if (props.filterType === 'bike') return getBikes()
  return products
})

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return baseProducts.value
  return baseProducts.value.filter(p => p.category === activeFilter.value)
})

function setFilter(filter) {
  activeFilter.value = filter
}

watch(() => route.params.category, () => {
  activeFilter.value = 'all'
})
</script>

<style scoped>
.product-list-page {
  padding-top: 100px;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 40px;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 0.8rem;
  color: var(--cc-gray);
}

.breadcrumbs a {
  color: var(--cc-gray);
}
.breadcrumbs a:hover {
  color: var(--cc-yellow);
}

.page-header h1 {
  margin-bottom: 8px;
}

.page-desc {
  color: var(--cc-gray);
  font-size: 1rem;
}

.filters-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 18px;
  background: var(--cc-dark-2);
  border: 1px solid var(--cc-gray-border);
  color: var(--cc-white);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tab:hover, .filter-tab.active {
  border-color: var(--cc-yellow);
  color: var(--cc-yellow);
}

.filter-tab.active {
  background: rgba(255, 209, 0, 0.1);
}

.results-count {
  color: var(--cc-gray);
  font-size: 0.8rem;
  font-family: var(--font-mono);
}

.no-results {
  text-align: center;
  padding: 80px 0;
  color: var(--cc-gray);
}

.no-results p {
  margin-bottom: 24px;
}
</style>
