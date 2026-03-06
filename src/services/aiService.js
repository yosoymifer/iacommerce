import { products } from '../data/products.js'
import { useCart } from '../stores/cartStore.js'

const SYSTEM_PROMPT = `Eres el asistente virtual de COMMENCAL, una marca francesa líder en bicicletas de montaña de alto rendimiento. Tu nombre es "COMMENCAL AI".

TU PERSONALIDAD:
- Eres un experto apasionado del mountain bike
- Hablas de forma cercana, entusiasta pero profesional
- Usas español
- Conoces a fondo cada producto del catálogo
- Eres proactivo: sugieres productos y accesorios complementarios
- Tu objetivo es ayudar al cliente a encontrar su bici ideal Y cerrar la venta

CATÁLOGO DE PRODUCTOS:
${JSON.stringify(products.map(p => ({
    id: p.id,
    nombre: p.name,
    tipo: p.type,
    categoria: p.category,
    precio: p.price + '€',
    actividad: p.activity,
    nivel: p.riderLevel,
    recorrido: p.travel || 'N/A',
    ruedas: p.wheelSize || 'N/A',
    motor: p.motor || null,
    bateria: p.battery || null,
    peso: p.weight || 'N/A',
    descripcion: p.shortDesc,
    highlights: p.highlights,
    tallas: p.sizes || [],
    crossSell: p.crossSell
})), null, 2)}

INSTRUCCIONES DE COMPORTAMIENTO (¡MUY IMPORTANTE!):
1. Cuando el cliente pregunte por recomendaciones, pregunta sobre su actividad, nivel y presupuesto.
2. SIEMPRE incluye el precio en tus recomendaciones de texto.
3. ¡ATENCIÓN! SÍ PUEDES MOSTRAR IMÁGENES Y TARJETAS DE PRODUCTO. Para hacerlo, DEBES usar EXACTAMENTE este formato en tu respuesta: [PRODUCT:id]. El sistema interceptará este código y mostrará una tarjeta visual interactiva con la foto, precio y botón de compra al lado de tu texto. Ejemplo: "Te recomiendo esta bici: [PRODUCT:1]"
4. Nunca digas que "no puedes mostrar imágenes" o "no puedes mostrar tarjetas". Sí puedes, usando el tag [PRODUCT:id].
5. ¡CRÍTICO SOBRE TALLAS! NUNCA asumas ni elijas la talla de una bicicleta o ropa automáticamente. Si el cliente quiere comprar, DEBES preguntarle su estatura o talla primero.
6. ¡CRÍTICO SOBRE EL CARRITO! Revisa SIEMPRE el "ESTADO ACTUAL DEL CARRITO". Si el cliente ya añadió el producto (porque hizo clic en el botón de la tarjeta), ¡NO USES el comando [ADD_TO_CART]! En su lugar, ofrécele ir a pagar usando [CHECKOUT].
7. Solo usa el comando [ADD_TO_CART:id:talla] si el cliente te confirma la talla, pide que lo añadas tú, y el producto AÚN NO está en el carrito.
8. Si el cliente quiere pagar, finalizar la compra o ir al carrito, usa el formato: [CHECKOUT]. Esto abrirá la ventana de caja.
9. Después de recomendar o añadir una bici, SIEMPRE sugiere accesorios complementarios como cross-selling.
10. Sé conciso pero informativo. Usa el ID exacto del catálogo numérico.

EJEMPLO DE INTERACCIÓN:
Cliente: "Quiero una bici para enduro"
Asistente: "¡Genial elección! 🤘 Para recomendarte la mejor enduro, me gustaría saber:
- ¿Cuál es tu nivel? (principiante, intermedio, avanzado)
- ¿Qué tipo de terreno sueles montar? (bike parks, trails naturales, competición)
- ¿Tienes un presupuesto aproximado?"

ESTADO ACTUAL DEL CARRITO:
{CART_STATE}
`

class AiService {
    constructor() {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null
        this.conversationHistory = []
        this.isConfigured = !!this.apiKey
        this.provider = 'openai' // 'openai' or 'openrouter'
    }

    configure(apiKey, provider = 'openai') {
        if (apiKey) this.apiKey = apiKey
        if (provider) this.provider = provider
        this.isConfigured = !!this.apiKey
    }

    resetConversation() {
        this.conversationHistory = []
    }

    getEndpoint() {
        if (this.provider === 'openrouter') {
            return 'https://openrouter.ai/api/v1/chat/completions'
        }
        return 'https://api.openai.com/v1/chat/completions'
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        }
        if (this.provider === 'openrouter') {
            headers['HTTP-Referer'] = window.location.origin
            headers['X-Title'] = 'Commencal AI Demo'
        }
        return headers
    }

    getModel() {
        if (this.provider === 'openrouter') {
            return 'google/gemini-2.0-flash-exp:free'
        }
        return 'gpt-4o-mini'
    }

    async sendMessage(userMessage, cartSummary = '') {
        if (!this.isConfigured) {
            return {
                text: '⚠️ Para activar el asistente de IA, introduce tu API key y haz clic en "Conectar".',
                products: [],
                actions: []
            }
        }

        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        })

        try {
            const systemPrompt = SYSTEM_PROMPT.replace('{CART_STATE}', cartSummary || 'El carrito está vacío.')

            const messages = [
                { role: 'system', content: systemPrompt },
                ...this.conversationHistory
            ]

            const response = await fetch(this.getEndpoint(), {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    model: this.getModel(),
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 800
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `API error: ${response.status}`)
            }

            const data = await response.json()
            const assistantMessage = data.choices[0].message.content

            this.conversationHistory.push({
                role: 'assistant',
                content: assistantMessage
            })

            return this.parseResponse(assistantMessage)

        } catch (error) {
            console.error('AI Service Error:', error)
            return {
                text: `Lo siento, hubo un error al procesar tu consulta. ${error.message}`,
                products: [],
                actions: []
            }
        }
    }

    parseResponse(text) {
        const productIds = []
        const actions = []

        // Extract product recommendations [PRODUCT:id]
        const productRegex = /\[PRODUCT:(\d+)\]/g
        let match
        while ((match = productRegex.exec(text)) !== null) {
            const id = parseInt(match[1])
            const product = products.find(p => p.id === id)
            if (product) {
                productIds.push(product)
            }
        }

        // Extract add to cart actions [ADD_TO_CART:id:size]
        const cartRegex = /\[ADD_TO_CART:(\d+):([^\]]+)\]/g
        while ((match = cartRegex.exec(text)) !== null) {
            actions.push({
                type: 'add_to_cart',
                productId: parseInt(match[1]),
                size: match[2]
            })
        }

        // Extract checkout action [CHECKOUT]
        if (text.includes('[CHECKOUT]')) {
            actions.push({ type: 'checkout' })
        }

        // Clean up the text (remove action tags)
        let cleanText = text
            .replace(/\[PRODUCT:\d+\]/g, '')
            .replace(/\[ADD_TO_CART:\d+:[^\]]+\]/g, '')
            .replace(/\[CHECKOUT\]/g, '')
            .trim()

        return {
            text: cleanText,
            products: productIds,
            actions: actions
        }
    }
}

export const aiService = new AiService()
