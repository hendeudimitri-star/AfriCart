// Wishlist Page Logic
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderWishlist() {
    const wishlistContent = document.getElementById('wishlistContent');
    
    if (wishlist.length === 0) {
        wishlistContent.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-heart"></i>
                <h2>Votre liste de favoris est vide</h2>
                <p>Ajoutez des produits à vos favoris !</p>
                <a href="../index.html" class="btn btn-primary mt-20">Découvrir les produits</a>
            </div>
        `;
        return;
    }

    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid';

    wishlist.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(item.price)}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCartFromWishlist('${item.id}')">
                        <i class="fas fa-shopping-cart"></i> Ajouter
                    </button>
                    <button class="add-to-wishlist" onclick="removeFromWishlist('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });

    wishlistContent.innerHTML = '';
    wishlistContent.appendChild(productsGrid);
}

function addToCartFromWishlist(productId) {
    const product = wishlist.find(item => item.id == productId);
    if (product) {
        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id != productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
    updateWishlistCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }
}

function updateWishlistCount() {
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = wishlist.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderWishlist();
    updateWishlistCount();
    updateCartCount();
});
