<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-container">
      <router-link to="/" class="nav-logo">COMMENCAL</router-link>

      <nav class="nav-menu" :class="{ open: menuOpen }">
        <router-link to="/bikes" class="nav-link" @click="menuOpen = false">Bikes</router-link>
        <router-link to="/category/enduro" class="nav-link" @click="menuOpen = false">Enduro</router-link>
        <router-link to="/category/trail" class="nav-link" @click="menuOpen = false">Trail</router-link>
        <router-link to="/category/downhill" class="nav-link" @click="menuOpen = false">Downhill</router-link>
        <router-link to="/category/ebike" class="nav-link" @click="menuOpen = false">E-Bikes</router-link>
        <router-link to="/category/accessories" class="nav-link" @click="menuOpen = false">Accesorios</router-link>
        <router-link to="/category/clothing" class="nav-link" @click="menuOpen = false">Ropa</router-link>
      </nav>

      <div class="nav-actions">
        <button class="cart-btn" @click="toggleCart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span class="cart-badge" v-if="totalItems > 0">{{ totalItems }}</span>
        </button>
        <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../stores/cartStore.js'

const { totalItems, toggleCart } = useCart()
const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all var(--transition-base);
  background: transparent;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  padding: 10px 0;
  border-bottom: 1px solid var(--cc-gray-border);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--cc-white) !important;
  transition: color var(--transition-fast);
}

.nav-logo:hover {
  color: var(--cc-yellow) !important;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--cc-white);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--cc-yellow);
  transition: width var(--transition-base);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--cc-yellow);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-btn {
  background: none;
  border: none;
  color: var(--cc-white);
  cursor: pointer;
  position: relative;
  padding: 8px;
  transition: color var(--transition-fast);
}

.cart-btn:hover { color: var(--cc-yellow); }

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--cc-yellow);
  color: var(--cc-black);
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--cc-white);
  transition: all var(--transition-base);
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 900px) {
  .hamburger { display: flex; }
  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.97);
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    transform: translateX(100%);
    transition: transform var(--transition-base);
    z-index: 999;
  }
  .nav-menu.open {
    transform: translateX(0);
  }
  .nav-link {
    font-size: 1.2rem;
  }
}
</style>
