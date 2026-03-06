<template>
  <div id="commencal-app">
    <NavBar />
    <main>
      <router-view />
    </main>
    <CartSidebar />
    <AiChat />
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">COMMENCAL</div>
            <p>Andorra since 2000. Born to ride.</p>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <h4>Bikes</h4>
              <router-link to="/category/enduro">Enduro</router-link>
              <router-link to="/category/trail">Trail</router-link>
              <router-link to="/category/downhill">Downhill</router-link>
              <router-link to="/category/ebike">E-Bikes</router-link>
            </div>
            <div class="footer-col">
              <h4>Equipamiento</h4>
              <router-link to="/category/accessories">Accesorios</router-link>
              <router-link to="/category/clothing">Ropa</router-link>
            </div>
            <div class="footer-col">
              <h4>Soporte</h4>
              <a href="#">Contacto</a>
              <a href="#">FAQ</a>
              <a href="#">Garantía</a>
              <a href="#">Envíos</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 COMMENCAL. Demo con IA — Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import CartSidebar from './components/CartSidebar.vue'
import AiChat from './components/AiChat.vue'
</script>

<style scoped>
.site-footer {
  background: var(--cc-dark);
  border-top: 1px solid var(--cc-gray-border);
  padding: 60px 0 24px;
  margin-top: 80px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--cc-yellow);
  margin-bottom: 12px;
}

.footer-brand p {
  color: var(--cc-gray);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 64px;
  flex-wrap: wrap;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-col h4 {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cc-white);
  margin-bottom: 8px;
}

.footer-col a {
  color: var(--cc-gray);
  font-size: 0.85rem;
  transition: color var(--transition-fast);
}

.footer-col a:hover {
  color: var(--cc-yellow);
}

.footer-bottom {
  border-top: 1px solid var(--cc-gray-border);
  padding-top: 24px;
  text-align: center;
}

.footer-bottom p {
  color: var(--cc-gray);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  .footer-links {
    gap: 32px;
  }
}
</style>
