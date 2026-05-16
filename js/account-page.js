// Account Page Logic
let user = JSON.parse(localStorage.getItem('user'));

function renderAccountPage() {
    const accountContent = document.getElementById('accountContent');

    if (!user) {
        // Redirect to login if not logged in
        accountContent.innerHTML = `
            <div class="auth-card">
                <h2>Non connecté</h2>
                <p style="text-align: center; margin-bottom: 20px;">
                    Veuillez vous connecter pour accéder à votre compte.
                </p>
                <a href="login.html" class="btn btn-primary btn-lg full-width" style="text-align: center;">Se connecter</a>
                <div style="text-align: center; margin-top: 15px;">
                    <p>Pas encore de compte ? <a href="signup.html">S'inscrire</a></p>
                </div>
            </div>
        `;
        return;
    }

    // User is logged in
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    
    accountContent.innerHTML = `
        <div class="account-section">
            <div class="account-grid">
                <div class="account-sidebar">
                    <ul class="account-menu">
                        <li><a href="#" class="menu-item active" data-tab="profile">Mon Profil</a></li>
                        <li><a href="#" class="menu-item" data-tab="orders">Mes Commandes</a></li>
                        <li><a href="#" class="menu-item" data-tab="settings">Paramètres</a></li>
                        <li><a href="#" class="menu-item logout">Déconnexion</a></li>
                    </ul>
                </div>

                <div class="account-content">
                    <!-- Profile Tab -->
                    <div id="profileTab" class="tab-content active">
                        <div class="profile-header">
                            <div class="user-avatar">${user.firstName.charAt(0).toUpperCase()}</div>
                            <h1>${user.firstName} ${user.lastName}</h1>
                            <p>${user.email}</p>
                        </div>

                        <h2><i class="fas fa-info-circle"></i> Informations Personnelles</h2>
                        <div class="account-info">
                            <div class="info-item">
                                <div class="info-label">Prénom</div>
                                <div class="info-value">${user.firstName}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Nom</div>
                                <div class="info-value">${user.lastName}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Email</div>
                                <div class="info-value">${user.email}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Membre depuis</div>
                                <div class="info-value">${new Date(user.joinDate).toLocaleDateString('fr-FR')}</div>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="switchTab('edit')" style="margin-top: 20px;">
                            Modifier mon profil
                        </button>
                    </div>

                    <!-- Orders Tab -->
                    <div id="ordersTab" class="tab-content">
                        <h2><i class="fas fa-history"></i> Historique des Commandes</h2>
                        <div class="orders-list">
                            ${lastOrder ? `
                                <div class="order-item">
                                    <div>
                                        <div class="order-date">${lastOrder.orderNumber}</div>
                                        <small>${lastOrder.date}</small>
                                    </div>
                                    <div>
                                        ${lastOrder.items.length} article(s) - 
                                        <strong>${formatPrice(parseFloat(lastOrder.total))}</strong>
                                    </div>
                                    <span class="order-status completed">Livrée</span>
                                </div>
                            ` : `
                                <p>Vous n'avez pas de commandes pour le moment.</p>
                                <a href="../index.html" class="btn btn-primary" style="margin-top: 15px;">Parcourir les produits</a>
                            `}
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div id="settingsTab" class="tab-content">
                        <h2><i class="fas fa-cog"></i> Paramètres</h2>
                        <div style="margin-top: 20px;">
                            <div class="form-group checkbox">
                                <input type="checkbox" id="newsletter" checked>
                                <label for="newsletter">Recevoir les offres spéciales et newsletters</label>
                            </div>
                            <div class="form-group checkbox">
                                <input type="checkbox" id="notifications" checked>
                                <label for="notifications">Recevoir les notifications de commandes</label>
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="saveSettings()" style="margin-top: 20px;">
                            Enregistrer les paramètres
                        </button>
                    </div>

                    <!-- Edit Profile Tab -->
                    <div id="editTab" class="tab-content">
                        <h2><i class="fas fa-edit"></i> Modifier mon Profil</h2>
                        <form id="editForm" class="edit-form">
                            <div class="form-group">
                                <label>Prénom</label>
                                <input type="text" value="${user.firstName}" required>
                            </div>
                            <div class="form-group">
                                <label>Nom</label>
                                <input type="text" value="${user.lastName}" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="${user.email}" required>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Enregistrer</button>
                                <button type="button" class="btn btn-secondary" onclick="switchTab('profile')">Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    setupAccountPage();
}

function setupAccountPage() {
    // Menu items
    const menuItems = document.querySelectorAll('.menu-item:not(.logout)');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            switchTab(tab);
            
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Logout button
    const logoutBtn = document.querySelector('.menu-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Edit form
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(editForm);
            const inputs = editForm.querySelectorAll('input');
            
            user.firstName = inputs[0].value;
            user.lastName = inputs[1].value;
            user.email = inputs[2].value;
            
            localStorage.setItem('user', JSON.stringify(user));
            alert('Profil mis à jour avec succès !');
            switchTab('profile');
            renderAccountPage();
        });
    }
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const tabId = tabName === 'orders' ? 'ordersTab' : 
                  tabName === 'settings' ? 'settingsTab' :
                  tabName === 'edit' ? 'editTab' : 'profileTab';
    
    const tab = document.getElementById(tabId);
    if (tab) {
        tab.classList.add('active');
        tab.style.display = 'block';
    }
}

function saveSettings() {
    const newsletter = document.getElementById('newsletter').checked;
    const notifications = document.getElementById('notifications').checked;
    
    user.settings = { newsletter, notifications };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Paramètres enregistrés !');
}

function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem('user');
        window.location.href = '../index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAccountPage();
});
