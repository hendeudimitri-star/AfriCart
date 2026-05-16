// Checkout Page Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const summaryDetails = document.getElementById('summaryDetails');

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let orderHTML = '';
    let subtotal = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        orderHTML += `
            <div class="summary-item">
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="summary-item-info">
                    <div class="summary-item-name">${item.name}</div>
                    <div class="summary-item-qty">Qty: ${item.quantity}</div>
                </div>
                <div class="summary-item-price">${formatPrice(itemTotal)}</div>
            </div>
        `;
    });

    orderSummary.innerHTML = orderHTML;

    const shipping = subtotal > 50000 ? 0 : 5000;
    const tax = subtotal * 0.20;
    const total = subtotal + shipping + tax;

    const summaryHTML = `
        <div class="summary-totals">
            <div class="summary-row">
                <span>Produits (${cart.length})</span>
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
            <div class="summary-row total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
        </div>
    `;

    summaryDetails.innerHTML = summaryHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    renderOrderSummary();

    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
});

function processOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    // Simulate order processing
    const orderNumber = 'CMD-' + Date.now();
    
    localStorage.setItem('lastOrder', JSON.stringify({
        orderNumber: orderNumber,
        date: new Date().toLocaleDateString('fr-FR'),
        items: cart,
        total: calculateTotal()
    }));

    localStorage.removeItem('cart');

    // Redirect to success page
    setTimeout(() => {
        showSuccessPage(orderNumber);
    }, 1500);
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 5000;
    const tax = subtotal * 0.20;
    return subtotal + shipping + tax;
}

function showSuccessPage(orderNumber) {
    const checkoutForm = document.querySelector('.checkout-form');
    const checkoutSummary = document.querySelector('.checkout-summary');

    checkoutForm.innerHTML = `
        <div class="success-container">
            <div class="success-icon">✓</div>
            <div class="success-message">
                <h2>Commande confirmée !</h2>
                <p>Merci pour votre achat. Vous recevrez un email de confirmation sous peu.</p>
                <div class="order-number">Numéro de commande: ${orderNumber}</div>
                <p style="font-size: 14px; color: var(--text-light); margin-top: 20px;">
                    Votre commande sera livrée dans les 2-3 jours ouvrables.
                </p>
                <div style="margin-top: 30px;">
                    <a href="../index.html" class="btn btn-primary">Continuer vos achats</a>
                </div>
            </div>
        </div>
    `;

    checkoutSummary.innerHTML = `
        <h2>Récapitulatif</h2>
        <div class="summary-totals" style="margin-top: 20px;">
            <div class="summary-row">
                <span>Commande:</span>
                <span>${orderNumber}</span>
            </div>
            <div class="summary-row">
                <span>Date:</span>
                <span>${new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div class="summary-row total">
                <span>Total payé:</span>
                <span>${formatPrice(calculateTotal())}</span>
            </div>
        </div>
        <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="color: #166534; margin: 0;">
                <i class="fas fa-check-circle"></i> Paiement reçu et confirmé
            </p>
        </div>
    `;
}
