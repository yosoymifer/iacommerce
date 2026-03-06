export const categories = [
    { id: 'enduro', name: 'Enduro', icon: '⛰️', description: 'Máximo rendimiento en descensos técnicos' },
    { id: 'trail', name: 'Trail', icon: '🌲', description: 'Versatilidad para cualquier terreno' },
    { id: 'downhill', name: 'Downhill', icon: '🏔️', description: 'Velocidad pura en descenso' },
    { id: 'ebike', name: 'E-Bike', icon: '⚡', description: 'Potencia eléctrica sin límites' },
    { id: 'accessories', name: 'Accesorios', icon: '🔧', description: 'Repuestos y equipamiento' },
    { id: 'clothing', name: 'Ropa', icon: '👕', description: 'Equipamiento rider' }
]

export const products = [
    // ===================== BIKES =====================
    {
        id: 1, slug: 'meta-sx-v5-ride', name: 'META SX V5 RIDE', type: 'bike', category: 'enduro',
        price: 3900, image: '/images/bike-enduro.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '170mm / 170mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox ZEB Select', shock: 'RockShox Super Deluxe Select+',
        drivetrain: 'SRAM GX Eagle 12v', brakes: 'SRAM Code Silver Stealth 4 pistones',
        weight: '15.8 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Avanzado', activity: 'Enduro agresivo, Bike Parks, Competición',
        shortDesc: 'La mountain bike definitiva para bike parks y enduro agresivo.',
        description: 'La META SX V5 RIDE es la máquina perfecta para quienes buscan dominar los bike parks y las etapas de enduro más exigentes. Con 170mm de recorrido tanto delante como detrás, geometría progresiva y componentes de primer nivel.',
        highlights: ['170mm de recorrido', 'Geometría progresiva', 'SRAM GX Eagle 12v', 'Ideal para bike parks'],
        crossSell: [2, 4, 11, 14]
    },
    {
        id: 2, slug: 'meta-sx-v5-ohlins', name: 'META SX V5 ÖHLINS', type: 'bike', category: 'enduro',
        price: 5600, image: '/images/bike-enduro.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '170mm / 170mm', frame: 'Aluminio 6066-T6',
        fork: 'Öhlins RXF 38 m.2', shock: 'Öhlins TTX Air',
        drivetrain: 'SRAM X0 Eagle T-Type AXS 12v', brakes: 'SRAM Maven Ultimate 4 pistones',
        weight: '15.2 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Experto / Competición', activity: 'Enduro competición, Bike Parks, Carreras EWS',
        shortDesc: 'Versión premium con suspensión Öhlins y transmisión SRAM X0 AXS.',
        description: 'La META SX V5 ÖHLINS representa lo mejor de lo mejor en enduro. Equipada con suspensión Öhlins de fábrica, transmisión inalámbrica SRAM X0 Eagle AXS y frenos Maven Ultimate.',
        highlights: ['Suspensión Öhlins de fábrica', 'SRAM X0 AXS inalámbrico', 'Frenos Maven Ultimate', 'Lista para competición EWS'],
        crossSell: [1, 3, 12, 15]
    },
    {
        id: 3, slug: 'meta-v5-ride', name: 'META V5 RIDE', type: 'bike', category: 'enduro',
        price: 3600, image: '/images/bike-enduro.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '160mm / 150mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox ZEB Select', shock: 'RockShox Super Deluxe Select',
        drivetrain: 'SRAM GX Eagle 12v', brakes: 'SRAM Code Silver Stealth 4 pistones',
        weight: '15.5 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Intermedio-Avanzado', activity: 'Enduro, All-Mountain, Trails técnicos',
        shortDesc: 'Enduro versátil que sube tan bien como baja.',
        description: 'La META V5 RIDE es la enduro más versátil de Commencal. Con una geometría equilibrada entre subida y bajada, 160mm de recorrido delantero y 150mm trasero.',
        highlights: ['160/150mm de recorrido', 'Geometría equilibrada', 'Excelente en subida y bajada', 'Versátil all-mountain'],
        crossSell: [1, 6, 13, 14]
    },
    {
        id: 4, slug: 'clash-ride', name: 'CLASH RIDE', type: 'bike', category: 'enduro',
        price: 2900, image: '/images/bike-enduro.png', color: 'Dark Slate',
        wheelSize: '27.5"', travel: '180mm / 170mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox ZEB Select', shock: 'RockShox Super Deluxe Select',
        drivetrain: 'SRAM GX Eagle 12v', brakes: 'SRAM Code Silver Stealth 4 pistones',
        weight: '16.1 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Intermedio-Avanzado', activity: 'Descenso agresivo, Freeride, Enduro, Saltos',
        shortDesc: 'Agresiva y divertida: la bici para enviar todo.',
        description: 'La CLASH RIDE es pura diversión y agresividad. Con ruedas de 27.5" y 180mm de recorrido, está diseñada para enviar saltos, drops y las líneas más agresivas.',
        highlights: ['27.5" para máxima agilidad', '180/170mm de recorrido', 'Geometría compacta y juguetona', 'Perfecta para freeride'],
        crossSell: [5, 1, 11, 15]
    },
    {
        id: 5, slug: 'clash-origin', name: 'CLASH ORIGIN', type: 'bike', category: 'enduro',
        price: 2200, image: '/images/bike-enduro.png', color: 'Dark Slate',
        wheelSize: '27.5"', travel: '180mm / 170mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox Yari RC', shock: 'RockShox Deluxe Select',
        drivetrain: 'SRAM SX Eagle 12v', brakes: 'SRAM DB8 4 pistones',
        weight: '16.5 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Principiante-Intermedio', activity: 'Enduro entrada, Freeride, Bike Parks',
        shortDesc: 'La puerta de entrada al mundo del enduro agresivo.',
        description: 'La CLASH ORIGIN es la forma más accesible de entrar al mundo del enduro agresivo. Misma plataforma y geometría que la CLASH RIDE pero con componentes orientados al mejor valor.',
        highlights: ['Mejor valor en enduro agresivo', 'Misma geometría que CLASH RIDE', 'RockShox Yari RC', 'Ideal para progresar'],
        crossSell: [4, 6, 13, 14]
    },
    {
        id: 6, slug: 'tempo-ride', name: 'T.E.M.P.O. RIDE', type: 'bike', category: 'trail',
        price: 2900, image: '/images/bike-trail.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '140mm / 130mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox Pike Select', shock: 'RockShox Deluxe Select+',
        drivetrain: 'SRAM GX Eagle 12v', brakes: 'SRAM G2 R 4 pistones',
        weight: '14.2 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Todos los niveles', activity: 'Trail, Rutas de montaña, All-Mountain ligero',
        shortDesc: 'Trail bike divertida y potente para cualquier ruta.',
        description: 'La T.E.M.P.O. RIDE es la trail bike que todo montañero necesita. Ligera, ágil y extremadamente divertida, con 140mm de recorrido delantero y 130mm trasero.',
        highlights: ['Ligera y ágil (14.2 kg)', '140/130mm de recorrido', 'RockShox Pike Select', 'Diversión en cualquier trail'],
        crossSell: [7, 3, 12, 14]
    },
    {
        id: 7, slug: 'tempo-ohlins', name: 'T.E.M.P.O. ÖHLINS', type: 'bike', category: 'trail',
        price: 4200, image: '/images/bike-trail.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '140mm / 130mm', frame: 'Aluminio 6066-T6',
        fork: 'Öhlins RXF 36 m.2', shock: 'Öhlins TTX1 Air',
        drivetrain: 'SRAM X0 Eagle T-Type AXS 12v', brakes: 'SRAM Maven Silver 4 pistones',
        weight: '13.6 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Avanzado', activity: 'Trail premium, Enduro ligero, Competición trail',
        shortDesc: 'Trail premium con Öhlins, para el rider más exigente.',
        description: 'La T.E.M.P.O. ÖHLINS es la versión más exclusiva de nuestra trail bike. Suspensión Öhlins de fábrica, transmisión inalámbrica SRAM X0 AXS y un peso de solo 13.6 kg.',
        highlights: ['Solo 13.6 kg', 'Suspensión Öhlins de fábrica', 'SRAM X0 AXS inalámbrico', 'La trail definitiva'],
        crossSell: [6, 2, 12, 15]
    },
    {
        id: 8, slug: 'supreme-dh-v5-ride', name: 'SUPREME DH V5 RIDE', type: 'bike', category: 'downhill',
        price: 4300, image: '/images/bike-downhill.png', color: 'Dark Slate',
        wheelSize: '29" / 27.5" mullet', travel: '200mm / 200mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox Boxxer Select', shock: 'RockShox Super Deluxe Coil Select',
        drivetrain: 'SRAM GX DH 7v', brakes: 'SRAM Code Silver Stealth 4 pistones 220mm',
        weight: '16.8 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Avanzado-Experto', activity: 'Downhill puro, Competición DH, Bike Parks',
        shortDesc: 'Pura raza de descenso: la heredera de una leyenda.',
        description: 'La SUPREME DH V5 RIDE es la heredera de una de las bicis de downhill más ganadoras de la historia. Con 200mm de recorrido y compatibilidad mullet.',
        highlights: ['200mm de recorrido total', 'Compatibilidad mullet 29/27.5', 'ADN de World Cup', 'RockShox Boxxer Select'],
        crossSell: [4, 1, 11, 15]
    },
    {
        id: 9, slug: 'meta-power-sx-essential', name: 'META POWER SX ESSENTIAL', type: 'bike', category: 'ebike',
        price: 5200, image: '/images/bike-ebike.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '170mm / 170mm', frame: 'Aluminio 6066-T6',
        fork: 'RockShox ZEB Select', shock: 'RockShox Super Deluxe Select',
        motor: 'Bosch Performance CX', battery: '750 Wh',
        drivetrain: 'SRAM GX Eagle 12v', brakes: 'SRAM Code Silver Stealth 4 pistones',
        weight: '23.5 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Todos los niveles', activity: 'E-MTB Enduro, Rutas largas, Bike Parks con asistencia',
        shortDesc: 'Enduro eléctrica con motor Bosch y 750Wh.',
        description: 'La META POWER SX ESSENTIAL combina la geometría probada de la META SX con la potencia del motor Bosch Performance CX y una batería de 750Wh.',
        highlights: ['Motor Bosch Performance CX', 'Batería 750Wh', '170mm de recorrido', 'Geometría META SX probada'],
        crossSell: [10, 1, 13, 14]
    },
    {
        id: 10, slug: 'tempo-power-essential', name: 'TEMPO POWER ESSENTIAL', type: 'bike', category: 'ebike',
        price: 5600, image: '/images/bike-ebike.png', color: 'Dark Slate',
        wheelSize: '29"', travel: '140mm / 130mm', frame: 'Aluminio 6066-T6',
        fork: 'Fox 36 Performance', shock: 'Fox Float Performance',
        motor: 'Bosch SX', battery: '400 Wh',
        drivetrain: 'Shimano Deore 12v', brakes: 'Shimano 4 pistones',
        weight: '19.9 kg', sizes: ['S', 'M', 'L', 'XL'],
        riderLevel: 'Todos los niveles', activity: 'E-MTB Trail, Mid-power, Rutas divertidas',
        shortDesc: 'E-bike trail ligera con motor Bosch SX y filosofía mid-power.',
        description: 'La TEMPO POWER ESSENTIAL revoluciona el concepto de eBike trail. Con el motor Bosch SX de 55Nm y solo 400Wh, apuesta por la filosofía mid-power: asistencia natural.',
        highlights: ['Solo 19.9 kg', 'Motor Bosch SX mid-power', 'Fox 36 + Fox Float', 'Pedaleo natural asistido'],
        crossSell: [9, 6, 12, 14]
    },

    // ===================== ACCESORIOS & REPUESTOS =====================
    {
        id: 11, slug: 'casco-commencal-full-face', name: 'CASCO FULL FACE COMMENCAL x FOX',
        type: 'accessory', category: 'accessories',
        price: 189, image: '/images/helmet.png', color: 'Negro / Amarillo',
        shortDesc: 'Casco integral con certificación MIPS para máxima protección.',
        description: 'Protección total para descenso y enduro. Casco integral con tecnología MIPS, ventilación optimizada y diseño exclusivo Commencal. Compatible con goggle.',
        highlights: ['Tecnología MIPS', 'Ventilación optimizada', 'Diseño exclusivo Commencal', 'Compatible con goggle'],
        riderLevel: 'Todos los niveles', activity: 'Downhill, Enduro, Bike Parks',
        crossSell: [12, 15, 1]
    },
    {
        id: 12, slug: 'casco-commencal-trail', name: 'CASCO TRAIL COMMENCAL x FOX',
        type: 'accessory', category: 'accessories',
        price: 129, image: '/images/helmet.png', color: 'Negro',
        shortDesc: 'Casco abierto ligero con protección extendida.',
        description: 'Casco de trail con cobertura extendida en la parte trasera. Ultraligero, bien ventilado y con sistema de ajuste rápido.',
        highlights: ['Ultraligero', 'Cobertura extendida', 'Ventilación superior', 'Sistema ajuste rápido'],
        riderLevel: 'Todos los niveles', activity: 'Trail, All-Mountain, XC',
        crossSell: [11, 14, 6]
    },
    {
        id: 13, slug: 'kit-rodamientos-meta', name: 'KIT RODAMIENTOS META V5 / SX V5',
        type: 'accessory', category: 'accessories',
        price: 89, image: '/images/bike-enduro.png', color: 'N/A',
        shortDesc: 'Kit completo de rodamientos para pivotes de suspensión.',
        description: 'Kit completo de rodamientos de repuesto para los pivotes de suspensión de las META V5 y META SX V5. Rodamientos sellados de alta calidad.',
        highlights: ['Rodamientos sellados', 'Kit completo', 'Compatible META V5 / SX V5', 'Fácil instalación'],
        riderLevel: 'Todos los niveles', activity: 'Mantenimiento',
        crossSell: [1, 3, 14]
    },

    // ===================== ROPA =====================
    {
        id: 14, slug: 'jersey-commencal-enduro', name: 'JERSEY COMMENCAL RACE',
        type: 'clothing', category: 'clothing',
        price: 59, image: '/images/jersey.png', color: 'Negro / Amarillo',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        shortDesc: 'Jersey técnico de manga larga para enduro y DH.',
        description: 'Jersey de manga larga con corte técnico para enduro y downhill. Tejido transpirable de secado rápido, costuras planas y diseño exclusivo Commencal.',
        highlights: ['Tejido transpirable', 'Secado rápido', 'Costuras planas', 'Diseño equipo Commencal'],
        riderLevel: 'Todos los niveles', activity: 'Enduro, Downhill, Trail',
        crossSell: [15, 11, 1]
    },
    {
        id: 15, slug: 'pantalon-commencal-ride', name: 'PANTALÓN COMMENCAL RIDE',
        type: 'clothing', category: 'clothing',
        price: 79, image: '/images/jersey.png', color: 'Negro',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        shortDesc: 'Pantalón resistente y flexible para MTB.',
        description: 'Pantalón de mountain bike con tejido resistente a la abrasión y elástico en 4 direcciones. Cintura ajustable y ventilación estratégica.',
        highlights: ['Resistente a abrasión', 'Elástico 4 direcciones', 'Ventilación estratégica', 'Cintura ajustable'],
        riderLevel: 'Todos los niveles', activity: 'Enduro, Trail, DH',
        crossSell: [14, 11, 4]
    }
]

export function getProductById(id) {
    return products.find(p => p.id === parseInt(id))
}

export function getProductBySlug(slug) {
    return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category) {
    return products.filter(p => p.category === category)
}

export function getBikes() {
    return products.filter(p => p.type === 'bike')
}

export function getAccessoriesAndClothing() {
    return products.filter(p => p.type === 'accessory' || p.type === 'clothing')
}

export function getCrossSellProducts(productId) {
    const product = getProductById(productId)
    if (!product) return []
    return product.crossSell.map(id => getProductById(id)).filter(Boolean)
}

export function searchProducts(query) {
    const q = query.toLowerCase()
    return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.activity.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
    )
}
