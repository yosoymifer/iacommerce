import { reactive, computed } from 'vue'
import { getProductById } from '../data/products.js'

const state = reactive({
    items: [],
    isOpen: false
})

export function useCart() {
    const items = computed(() => state.items)
    const isOpen = computed(() => state.isOpen)

    const totalItems = computed(() =>
        state.items.reduce((sum, item) => sum + item.quantity, 0)
    )

    const totalPrice = computed(() =>
        state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    )

    function addItem(productId, size = null) {
        const product = getProductById(productId)
        if (!product) return false

        const existingIndex = state.items.findIndex(
            item => item.id === productId && item.selectedSize === size
        )

        if (existingIndex >= 0) {
            state.items[existingIndex].quantity++
        } else {
            state.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                type: product.type,
                selectedSize: size,
                quantity: 1
            })
        }
        state.isOpen = true
        return true
    }

    function removeItem(index) {
        state.items.splice(index, 1)
    }

    function updateQuantity(index, quantity) {
        if (quantity <= 0) {
            removeItem(index)
        } else {
            state.items[index].quantity = quantity
        }
    }

    function clearCart() {
        state.items.splice(0, state.items.length)
    }

    function toggleCart() {
        state.isOpen = !state.isOpen
    }

    function openCart() {
        state.isOpen = true
    }

    function closeCart() {
        state.isOpen = false
    }

    function getCartSummaryForAI() {
        if (state.items.length === 0) return 'El carrito está vacío.'
        let summary = 'Productos en el carrito:\n'
        state.items.forEach(item => {
            summary += `- ${item.name} (${item.selectedSize || 'Talla única'}) x${item.quantity} — €${(item.price * item.quantity).toLocaleString()}\n`
        })
        summary += `\nTotal: €${totalPrice.value.toLocaleString()}`
        return summary
    }

    return {
        items,
        isOpen,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getCartSummaryForAI
    }
}
