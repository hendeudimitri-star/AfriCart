// Cart Page Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h2>Votre panier est vide</h2>
                <p>Découvrez nos produits et commencez vos achats !</p>
                <a href="../index.html" class="btn btn-primary mt-20">Continuer vos achats</a>
            </div>
        `;
        return;
    }

    let cartHTML = '<div class="cart-items">';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</div>
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" readonly>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; margin-bottom: 10px;">${formatPrice(itemTotal)}</div>
                    <span class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></span>
                </div>
            </div>
        `;
    });

    cartHTML += '</div>';

    const shipping = subtotal > 50000 ? 0 : 5000;
    const tax = subtotal * 0.20;
    const total = subtotal + shipping + tax;

    cartHTML += `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Sous-total</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Livraison</span>
                <span>${shipping === 0 ? 'Gratuite' : formatPrice(shipping)}</span>
            </div>
            <div class="summary-row">
                <span>TVA (20%)</span>
                <span>${formatPrice(tax)}</span>
            </div>
            <div class="summary-total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary checkout-btn">Procéder au paiement</a>
            <div class="continue-shopping">
                <a href="../index.html">← Continuer vos achats</a>
            </div>
        </div>
    `;

    cartContent.innerHTML = cartHTML;
}

function updateQuantity(index, change) {
    if (cart[index]) {
        const newQuantity = cart[index].quantity + change;
        if (newQuantity > 0 && newQuantity <= 10) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
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
    renderCart();
    updateWishlistCount();
});
