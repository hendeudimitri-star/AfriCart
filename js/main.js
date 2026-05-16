// ============ CART MANAGEMENT ============
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }
}

function updateWishlistCount() {
    const wishlistBadge = document.querySelector('.badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Produit ajouté au panier !', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToWishlist(productId) {
    const product = getProductById(productId);
    const exists = wishlist.find(item => item.id === productId);

    if (exists) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('Supprimé des favoris', 'info');
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        showNotification('Ajouté aux favoris !', 'success');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// ============ NOTIFICATIONS ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">✕</button>
        </div>
    `;
    
    // Add notification styles dynamically
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 2000;
                animation: slideInRight 0.3s ease;
            }
            
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                padding: 15px 20px;
                border-radius: 8px;
                font-weight: 500;
            }
            
            .notification-success .notification-content {
                background-color: #dcfce7;
                color: #166534;
                border-left: 4px solid #16a34a;
            }
            
            .notification-error .notification-content {
                background-color: #fee2e2;
                color: #991b1b;
                border-left: 4px solid #dc2626;
            }
            
            .notification-info .notification-content {
                background-color: #FFF0DC;
                color: #D4631F;
                border-left: 4px solid #E8722A;
            }
            
            .notification-content button {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 18px;
                opacity: 0.7;
                transition: opacity 0.3s;
            }
            
            .notification-content button:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

// ============ PRODUCT DISPLAY ============
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let currentProducts = [];

function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    currentProducts = productsToRender;
    currentPage = 1;

    renderPage();
    renderPagination();
    updatePaginationInfo();
}

function renderPage() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = currentProducts.slice(start, end);

    productsGrid.innerHTML = '';

    pageItems.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/37439165/pexels-photo-37439165.jpeg?auto=compress&cs=tinysrgb&w=300&h=250&dpr=1'">
                <span class="product-badge ${product.badgeType}">${product.badge}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryLabel(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${getStarRating(product.rating)}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    <span class="discount-percent">${calculateDiscount(product.price, product.originalPrice)}%</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Ajouter
                    </button>
                    <button class="add-to-wishlist" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;

        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                showProductDetails(product.id);
            }
        });

        productsGrid.appendChild(productCard);
    });
}

function renderPagination() {
    const paginationPages = document.getElementById('paginationPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (!paginationPages) return;

    const totalPages = Math.ceil(currentProducts.length / ITEMS_PER_PAGE);

    paginationPages.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-page' + (i === currentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderPage();
            renderPagination();
            updatePaginationInfo();
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        paginationPages.appendChild(pageBtn);
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage <= 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage();
                renderPagination();
                updatePaginationInfo();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }

    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage();
                renderPagination();
                updatePaginationInfo();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }
}

function updatePaginationInfo() {
    const info = document.getElementById('paginationInfo');
    if (!info) return;
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, currentProducts.length);
    info.textContent = `Affichage de ${start} à ${end} sur ${currentProducts.length} produits`;
}

function getCategoryLabel(category) {
    const labels = {
        'electronics': 'Électronique',
        'fashion': 'Mode',
        'home': 'Maison',
        'sports': 'Sports',
        'books': 'Livres',
        'all': 'Tous'
    };
    return labels[category] || category;
}

function getStarRating(rating) {
    const stars = Math.round(rating);
    return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
}

function calculateDiscount(currentPrice, originalPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// ============ PRODUCT MODAL ============
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    const relatedProducts = products.filter(p => 
        p.category === product.category && p.id !== productId
    ).slice(0, 3);

    modalBody.innerHTML = `
        <div class="product-detail-modal">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/37439165/pexels-photo-37439165.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'">
            </div>
            <div class="detail-info">
                <h2>${product.name}</h2>
                <div class="detail-rating">
                    <span class="stars">${getStarRating(product.rating)}</span>
                    <span>${product.rating}/5 (${product.reviews} avis)</span>
                </div>
                <div class="detail-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                </div>
                <p class="detail-description">${product.description}</p>
                
                <div class="quantity-selector">
                    <label>Quantité:</label>
                    <div class="quantity-input">
                        <button onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantityInput" value="1" min="1" max="10">
                        <button onclick="increaseQuantity()">+</button>
                    </div>
                </div>

                <div class="detail-actions">
                    <button class="btn btn-primary btn-lg" onclick="addToCartFromModal(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Ajouter au panier
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i> Ajouter aux favoris
                    </button>
                </div>

                <div class="detail-info-box">
                    <h4>Caractéristiques du produit</h4>
                    <ul>
                        <li><strong>Catégorie:</strong> ${getCategoryLabel(product.category)}</li>
                        <li><strong>Référence:</strong> #${product.id}</li>
                        <li><strong>Stock:</strong> Disponible</li>
                        <li><strong>Livraison:</strong> Gratuite (délai: 2-3 jours)</li>
                    </ul>
                </div>

                ${relatedProducts.length > 0 ? `
                    <div class="related-products">
                        <h4>Produits connexes</h4>
                        <div class="related-grid">
                            ${relatedProducts.map(p => `
                                <div class="related-item" onclick="showProductDetails(${p.id})">
                                    <img src="${p.image}" alt="${p.name}">
                                    <span>${p.name}</span>
                                    <span class="price">${formatPrice(p.price)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add modal styles if not exists
    if (!document.querySelector('#modal-detail-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-detail-styles';
        style.innerHTML = `
            .product-detail-modal {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }

            @media (max-width: 768px) {
                .product-detail-modal {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
            }

            .detail-image {
                text-align: center;
            }

            .detail-image img {
                max-width: 100%;
                border-radius: 12px;
            }

            .detail-info h2 {
                font-size: 24px;
                margin-bottom: 15px;
            }

            .detail-rating {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
            }

            .detail-price {
                display: flex;
                gap: 15px;
                align-items: center;
                margin-bottom: 20px;
                font-size: 18px;
            }

            .detail-price .current-price {
                color: #16a34a;
                font-weight: bold;
                font-size: 24px;
            }

            .detail-description {
                color: #64748b;
                line-height: 1.8;
                margin-bottom: 20px;
            }

            .quantity-selector {
                margin-bottom: 20px;
            }

            .quantity-selector label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
            }

            .quantity-input {
                display: flex;
                gap: 10px;
                align-items: center;
                max-width: 150px;
            }

            .quantity-input button {
                width: 40px;
                height: 40px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.3s;
            }

            .quantity-input button:hover {
                background-color: #E8722A;
                color: white;
            }

            .quantity-input input {
                flex: 1;
                padding: 8px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                text-align: center;
            }

            .detail-actions {
                display: flex;
                gap: 10px;
                margin-bottom: 30px;
            }

            @media (max-width: 768px) {
                .detail-actions {
                    flex-direction: column;
                }
            }

            .detail-info-box {
                background-color: #f8fafc;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }

            .detail-info-box h4 {
                margin-bottom: 15px;
                font-size: 16px;
            }

            .detail-info-box ul {
                list-style: none;
            }

            .detail-info-box li {
                padding: 8px 0;
                border-bottom: 1px solid #e2e8f0;
            }

            .detail-info-box li:last-child {
                border-bottom: none;
            }

            .related-products {
                margin-top: 30px;
            }

            .related-products h4 {
                margin-bottom: 15px;
            }

            .related-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }

            @media (max-width: 768px) {
                .related-grid {
                    grid-template-columns: 1fr;
                }
            }

            .related-item {
                text-align: center;
                cursor: pointer;
                padding: 10px;
                border-radius: 8px;
                transition: background-color 0.3s;
            }

            .related-item:hover {
                background-color: #f1f5f9;
            }

            .related-item img {
                width: 100%;
                height: 150px;
                object-fit: cover;
                border-radius: 6px;
                margin-bottom: 10px;
            }

            .related-item span {
                display: block;
                font-size: 14px;
            }

            .related-item .price {
                color: #E8722A;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
}

function addToCartFromModal(productId) {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    addToCart(productId, quantity);
    closeModal();
}

function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = Math.min(parseInt(input.value) + 1, 10);
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = Math.max(parseInt(input.value) - 1, 1);
}

// ============ FILTERING & SORTING ============
function setupFilters() {
    const categoriesDropdown = document.getElementById('categoriesDropdown');
    const sortBy = document.getElementById('sortBy');

    if (categoriesDropdown) {
        categoriesDropdown.addEventListener('click', (e) => {
            const item = e.target.closest('.category-item');
            if (item) {
                e.preventDefault();
                
                categoriesDropdown.querySelectorAll('.category-item').forEach(el => {
                    el.classList.remove('active');
                });
                item.classList.add('active');

                const category = item.dataset.category;
                const filteredProducts = getProductsByCategory(category);
                renderProducts(filteredProducts);
            }
        });

        categoriesDropdown.querySelector('[data-category="all"]')?.classList.add('active');
    }

    if (sortBy) {
        sortBy.addEventListener('change', (e) => {
            const sortType = e.target.value;
            let sortedProducts = [...products];

            switch (sortType) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'popular':
                    sortedProducts.sort((a, b) => b.reviews - a.reviews);
                    break;
                case 'newest':
                default:
                    // Keep original order
                    break;
            }

            renderProducts(sortedProducts);
        });
    }
}

// ============ SEARCH FUNCTIONALITY ============
function doSearch(query) {
    if (query.length >= 2) {
        const results = searchProducts(query);
        renderProducts(results);
    } else if (query.length === 0) {
        renderProducts(products);
    }
}

function setupSearch() {
    const searchBar = document.querySelector('.search-bar input');
    const searchBtn = document.getElementById('shopSearchBtn');
    if (!searchBar) return;

    searchBar.addEventListener('keyup', (e) => {
        doSearch(e.target.value.trim());
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            doSearch(searchBar.value.trim());
        });
    }
}

function setupHeroSearch() {
    const heroInput = document.getElementById('heroSearchInput');
    const heroBtn = document.getElementById('heroSearchBtn');
    if (!heroInput) return;

    function doHeroSearch() {
        const query = heroInput.value.trim();
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const searchBar = document.querySelector('.search-bar input');
        if (searchBar) {
            searchBar.value = query;
            doSearch(query);
        }
    }

    heroInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            doHeroSearch();
        }
    });

    if (heroBtn) {
        heroBtn.addEventListener('click', doHeroSearch);
    }
}

function setupShopHeroSearch() {
    const shopInput = document.getElementById('shopHeroSearch');
    const shopBtn = document.getElementById('shopHeroSearchBtn');
    if (!shopInput) return;

    function doShopSearch() {
        const query = shopInput.value.trim();
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const searchBar = document.querySelector('.search-bar input');
        if (searchBar) {
            searchBar.value = query;
            doSearch(query);
        }
    }

    shopInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            doShopSearch();
        }
    });

    if (shopBtn) {
        shopBtn.addEventListener('click', doShopSearch);
    }
}

// ============ NEWSLETTER SUBSCRIPTION ============
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            localStorage.setItem('newsletter_email', email);
            showNotification('Merci de votre abonnement !', 'success');
            form.reset();
        }
    });
}

// ============ MODAL CLOSE ============
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Close modal when clicking the X button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    const modal = document.getElementById('productModal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Initialize page
    renderProducts(products);
    setupFilters();
    setupSearch();
    setupHeroSearch();
    setupShopHeroSearch();
    setupNewsletter();
    updateCartCount();
    updateWishlistCount();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const categoryMenu = document.querySelector('.category-menu');
            if (categoryMenu) {
                categoryMenu.style.display = categoryMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
