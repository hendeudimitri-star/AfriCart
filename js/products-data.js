const products = [
    {
        id: 1,
        name: 'Casque Audio Sans Fil Premium',
        category: 'electronics',
        price: 129900,
        originalPrice: 199900,
        rating: 4.5,
        reviews: 128,
        image: 'https://images.pexels.com/photos/30677594/pexels-photo-30677594.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-35%',
        badgeType: 'discount',
        description: 'Casque audio haut de gamme avec réduction de bruit active et batterie 30h'
    },
    {
        id: 2,
        name: 'Montre Intelligente Connectée',
        category: 'electronics',
        price: 97500,
        originalPrice: 149900,
        rating: 4.3,
        reviews: 95,
        image: 'https://images.pexels.com/photos/9430885/pexels-photo-9430885.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: 'Nouveau',
        badgeType: 'new',
        description: 'Montre intelligente avec suivi fitness et notifications en temps réel'
    },
    {
        id: 3,
        name: 'Robe Élégante Noire',
        category: 'fashion',
        price: 49900,
        originalPrice: 79900,
        rating: 4.6,
        reviews: 212,
        image: 'https://images.pexels.com/photos/37439165/pexels-photo-37439165.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-38%',
        badgeType: 'discount',
        description: 'Robe élégante en tissu premium, parfaite pour toutes les occasions'
    },
    {
        id: 4,
        name: 'Baskets de Sport Confortables',
        category: 'fashion',
        price: 59900,
        originalPrice: 99900,
        rating: 4.4,
        reviews: 178,
        image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-40%',
        badgeType: 'discount',
        description: 'Baskets modernes avec technologie de confort maximale'
    },
    {
        id: 5,
        name: 'Lampe LED Décoration Intérieur',
        category: 'home',
        price: 29900,
        originalPrice: 54900,
        rating: 4.7,
        reviews: 345,
        image: 'https://images.pexels.com/photos/11235398/pexels-photo-11235398.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-46%',
        badgeType: 'discount',
        description: 'Lampe LED avec contrôle intelligente et 16 millions de couleurs'
    },
    {
        id: 6,
        name: 'Coussin Ergonomique Confort',
        category: 'home',
        price: 24900,
        originalPrice: 39900,
        rating: 4.5,
        reviews: 167,
        image: 'https://images.pexels.com/photos/35753872/pexels-photo-35753872.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-38%',
        badgeType: 'discount',
        description: 'Coussin ergonomique pour soulager les douleurs cervicales'
    },
    {
        id: 7,
        name: 'Haltère Ajustable 25kg',
        category: 'sports',
        price: 84900,
        originalPrice: 129900,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.pexels.com/photos/31162582/pexels-photo-31162582.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-35%',
        badgeType: 'discount',
        description: 'Haltères ajustables pour l\'entraînement complet'
    },
    {
        id: 8,
        name: 'Tapis de Yoga Premium',
        category: 'sports',
        price: 34900,
        originalPrice: 59900,
        rating: 4.8,
        reviews: 234,
        image: 'https://images.pexels.com/photos/31528043/pexels-photo-31528043.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-42%',
        badgeType: 'discount',
        description: 'Tapis de yoga antidérapant avec sac de transport'
    },
    {
        id: 9,
        name: 'Guide Complet du Développement Web',
        category: 'books',
        price: 24900,
        originalPrice: 39900,
        rating: 4.7,
        reviews: 412,
        image: 'https://images.pexels.com/photos/20618740/pexels-photo-20618740.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-38%',
        badgeType: 'discount',
        description: 'Livre complet sur le développement web moderne'
    },
    {
        id: 10,
        name: 'Roman Mystère Bestseller',
        category: 'books',
        price: 9900,
        originalPrice: 14900,
        rating: 4.4,
        reviews: 678,
        image: 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-34%',
        badgeType: 'discount',
        description: 'Un roman palpitant qui vous tiendra en haleine'
    },
    {
        id: 11,
        name: 'Webcam 4K Ultra HD',
        category: 'electronics',
        price: 79900,
        originalPrice: 119900,
        rating: 4.5,
        reviews: 143,
        image: 'https://images.pexels.com/photos/5331198/pexels-photo-5331198.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-33%',
        badgeType: 'discount',
        description: 'Webcam 4K pour streamer et vidéoconférence professionnelle'
    },
    {
        id: 12,
        name: 'Batterie Externe 30000mAh',
        category: 'electronics',
        price: 24900,
        originalPrice: 44900,
        rating: 4.6,
        reviews: 567,
        image: 'https://images.pexels.com/photos/6331230/pexels-photo-6331230.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-45%',
        badgeType: 'discount',
        description: 'Batterie externe haute capacité pour tous vos appareils'
    },
    {
        id: 13,
        name: 'Veste de Cuir Classique',
        category: 'fashion',
        price: 129900,
        originalPrice: 199900,
        rating: 4.7,
        reviews: 234,
        image: 'https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-35%',
        badgeType: 'discount',
        description: 'Veste de cuir véritable, intemporelle et élégante'
    },
    {
        id: 14,
        name: 'Pantalon Chino Premium',
        category: 'fashion',
        price: 44900,
        originalPrice: 69900,
        rating: 4.3,
        reviews: 189,
        image: 'https://images.pexels.com/photos/7007176/pexels-photo-7007176.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-36%',
        badgeType: 'discount',
        description: 'Pantalon chino confortable et élégant pour tous les jours'
    },
    {
        id: 15,
        name: 'Tableau Mural Décoratif',
        category: 'home',
        price: 34900,
        originalPrice: 59900,
        rating: 4.6,
        reviews: 156,
        image: 'https://images.pexels.com/photos/21326994/pexels-photo-21326994.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-42%',
        badgeType: 'discount',
        description: 'Tableau mural moderne pour décorer votre intérieur'
    },
    {
        id: 16,
        name: 'Applique Murale LED',
        category: 'home',
        price: 44900,
        originalPrice: 69900,
        rating: 4.5,
        reviews: 234,
        image: 'https://images.pexels.com/photos/31661556/pexels-photo-31661556.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-36%',
        badgeType: 'discount',
        description: 'Applique murale moderne avec LED intégrée'
    },
    {
        id: 17,
        name: 'Gourde Hydro Isotherme 500ml',
        category: 'sports',
        price: 24900,
        originalPrice: 39900,
        rating: 4.7,
        reviews: 445,
        image: 'https://images.pexels.com/photos/5938590/pexels-photo-5938590.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-38%',
        badgeType: 'discount',
        description: 'Gourde isolante pour garder vos boissons à la bonne température'
    },
    {
        id: 18,
        name: 'Sac à Dos de Randonnée 40L',
        category: 'sports',
        price: 54900,
        originalPrice: 89900,
        rating: 4.6,
        reviews: 312,
        image: 'https://images.pexels.com/photos/35564443/pexels-photo-35564443.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-39%',
        badgeType: 'discount',
        description: 'Sac à dos ergonomique de 40L pour vos aventures'
    },
    {
        id: 19,
        name: 'Coffret Développement Personnel',
        category: 'books',
        price: 34900,
        originalPrice: 54900,
        rating: 4.8,
        reviews: 567,
        image: 'https://images.pexels.com/photos/4109751/pexels-photo-4109751.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-36%',
        badgeType: 'discount',
        description: 'Coffret de 3 livres sur le développement personnel'
    },
    {
        id: 20,
        name: 'Collection Poésie Moderne',
        category: 'books',
        price: 14900,
        originalPrice: 24900,
        rating: 4.4,
        reviews: 178,
        image: 'https://images.pexels.com/photos/6994318/pexels-photo-6994318.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1',
        badge: '-40%',
        badgeType: 'discount',
        description: 'Collection de poésie contemporaine par les meilleurs auteurs'
    }
];

function getProductById(id) {
    return products.find(product => product.id === id);
}

function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

function formatPrice(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, getProductById, getProductsByCategory, searchProducts, formatPrice };
}