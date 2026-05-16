# ShopHub - Site E-Commerce Complet

Un site e-commerce moderne et responsive créé avec HTML5, CSS3 et JavaScript vanilla.

## 📁 Structure du Projet

```
e-commerce/
├── index.html                 # Page d'accueil
├── css/
│   ├── styles.css            # Styles principaux
│   ├── responsive.css        # Styles responsive
│   ├── auth.css              # Styles des pages d'authentification
│   ├── checkout.css          # Styles du paiement
│   └── pages.css             # Styles des autres pages
├── js/
│   ├── main.js               # Logique principale
│   ├── products-data.js      # Données des produits
│   ├── cart-page.js          # Logique du panier
│   ├── wishlist-page.js      # Logique des favoris
│   ├── checkout-page.js      # Logique du paiement
│   ├── account-page.js       # Logique du compte utilisateur
│   ├── login-page.js         # Logique de la connexion
│   └── signup-page.js        # Logique de l'inscription
├── pages/
│   ├── cart.html             # Page du panier
│   ├── wishlist.html         # Page des favoris
│   ├── checkout.html         # Page de paiement
│   ├── account.html          # Page du compte utilisateur
│   ├── login.html            # Page de connexion
│   ├── signup.html           # Page d'inscription
│   ├── contact.html          # Page de contact
│   ├── about.html            # Page à propos
│   └── 404.html              # Page erreur 404
└── e-commerce page/          # Dossier des images mockup
    ├── E-Commerce HomePage.jpg
    ├── Product Details page.jpg
    ├── Cart.jpg
    └── ... (autres images)
```

## 🚀 Fonctionnalités

### ✨ Principales
- **Page d'accueil dynamique** avec bannière, promotions et grille produits
- **Gestion du panier** avec ajout/suppression/modification quantité
- **Liste de favoris** (wishlist)
- **Système de recherche** des produits
- **Filtrage par catégorie**
- **Tri des produits** (prix, popularité, récents)
- **Panier persistant** (stockage local)
- **Page de paiement** avec récapitulatif

### 👤 Gestion Utilisateur
- **Système d'authentification** (login/signup)
- **Page de profil utilisateur**
- **Historique des commandes**
- **Paramètres de compte**

### 📱 Responsive Design
- **Mobile-first** (320px et plus)
- **Adaptations tablette** (768px+)
- **Écrans larges** (1920px+)
- **Touches optimisées** pour tactile

### 🛍️ Pages Incluses
- ✅ Accueil
- ✅ Panier
- ✅ Favoris
- ✅ Paiement
- ✅ Compte utilisateur
- ✅ Connexion
- ✅ Inscription
- ✅ Contact
- ✅ À propos
- ✅ Erreur 404

## 🎨 Design

### Palette de Couleurs
- **Primaire**: #E8722A (Orange vif)
- **Secondaire**: #64748b (Gris)
- **Succès**: #16a34a (Vert)
- **Danger**: #dc2626 (Rouge)
- **Fond**: #f8fafc (Gris clair)

### Typographie
- **Font**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold
- **Body**: Regular

## 💾 Stockage Local

Le site utilise `localStorage` pour :
- **Panier**: `cart`
- **Favoris**: `wishlist`
- **Utilisateur connecté**: `user`
- **Dernière commande**: `lastOrder`
- **Newsletter**: `newsletter_email`

## 🔧 Installation

1. **Télécharger/Cloner** le projet
2. **Ouvrir** `index.html` dans un navigateur
3. Aucune configuration serveur requise !

## 📦 Données Produits

Le fichier `js/products-data.js` contient 20 produits d'exemple dans les catégories :
- Électronique
- Mode
- Maison
- Sports
- Livres

## 🔐 Sécurité

- Validation des formulaires côté client
- Protection contre les injections XSS basique
- Paiements simulés (démonstration)
- Données sensibles dans localStorage uniquement

## 📊 Performance

- **Images optimisées** (placeholder CDN)
- **CSS minifiée** (structure)
- **JavaScript vanilla** (pas de dépendances)
- **Chargement rapide** (<2s)

## 🌐 Navigateurs Supportés

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Modifications Possibles

### Ajouter des produits
Éditer `js/products-data.js` et ajouter dans l'array `products`

### Changer les couleurs
Modifier les variables CSS dans `:root` dans `css/styles.css`

### Intégrer une API
Remplacer `products-data.js` par des appels fetch

### Ajouter PayPal/Stripe
Intégrer les SDK dans `checkout.html`

## 📞 Support

Pour des questions ou améliorations, consultez les fichiers de code ou contactez le support.

## 📄 Licence

Libre d'utilisation à titre personnel ou professionnel.

---

**Créé en 2026** | **Version 1.0**
