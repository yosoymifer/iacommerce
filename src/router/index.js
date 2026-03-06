import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductListPage from '../views/ProductListPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/bikes', name: 'bikes', component: ProductListPage, props: { filterType: 'bike' } },
    { path: '/category/:category', name: 'category', component: ProductListPage, props: true },
    { path: '/product/:slug', name: 'product', component: ProductDetailPage, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
