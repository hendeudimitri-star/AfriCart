function updateHeaderCounters() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const cartCount = document.querySelector('.cart-count');
    const wishlistBadge = document.querySelector('.badge');

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
    }
}

function updateAccountUI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const dropdownUserName = document.getElementById('dropdownUserName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const dropdownLoginBtn = document.getElementById('dropdownLoginBtn');
    const dropdownLogoutBtn = document.getElementById('dropdownLogoutBtn');
    const mobileUserName = document.getElementById('mobileUserName');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const accountTrigger = document.getElementById('accountTrigger');

    if (user) {
        if (dropdownUserName) dropdownUserName.textContent = user.firstName + ' ' + user.lastName;
        if (dropdownUserEmail) dropdownUserEmail.textContent = user.email;
        if (dropdownLoginBtn) dropdownLoginBtn.style.display = 'none';
        if (dropdownLogoutBtn) dropdownLogoutBtn.style.display = 'flex';
        if (mobileUserName) mobileUserName.textContent = 'Bonjour, ' + user.firstName;
        if (mobileLoginBtn) {
            mobileLoginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Déconnexion';
            mobileLoginBtn.href = '#';
            mobileLoginBtn.onclick = function(e) {
                e.preventDefault();
                logout();
            };
        }
        if (accountTrigger) accountTrigger.href = 'pages/account.html';
    } else {
        if (dropdownUserName) dropdownUserName.textContent = 'Invité';
        if (dropdownUserEmail) dropdownUserEmail.textContent = 'Connectez-vous';
        if (dropdownLoginBtn) dropdownLoginBtn.style.display = 'flex';
        if (dropdownLogoutBtn) dropdownLogoutBtn.style.display = 'none';
        if (mobileUserName) mobileUserName.textContent = 'Bonjour, Invité';
        if (mobileLoginBtn) {
            mobileLoginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Connexion';
            mobileLoginBtn.href = 'pages/login.html';
            mobileLoginBtn.onclick = null;
        }
        if (accountTrigger) accountTrigger.href = 'pages/account.html';
    }
}

function setupAccountDropdown() {
    const accountTrigger = document.getElementById('accountTrigger');
    const accountDropdown = document.getElementById('accountDropdown');
    const dropdownLogoutBtn = document.getElementById('dropdownLogoutBtn');

    if (accountTrigger && accountDropdown) {
        accountTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            accountDropdown.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!accountTrigger.contains(e.target) && !accountDropdown.contains(e.target)) {
                accountDropdown.classList.remove('show');
            }
        });
    }

    if (dropdownLogoutBtn) {
        dropdownLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (menuToggle && mobileMenu && mobileOverlay) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileOverlay.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem('user');
        updateAccountUI();
        const accountDropdown = document.getElementById('accountDropdown');
        if (accountDropdown) accountDropdown.classList.remove('show');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const menuToggle = document.getElementById('menuToggle');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderCounters();
    updateAccountUI();
    setupAccountDropdown();
    setupMobileMenu();
});