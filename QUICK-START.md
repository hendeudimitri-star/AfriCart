# Guide de Démarrage Rapide - ShopHub

## ⚡ Démarrage en 2 minutes

### 1. Ouvrir directement dans le navigateur
```
Double-cliquez sur: index.html
```

### 2. Serveur local (optionnel)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Puis allez à: `http://localhost:8000`

## 🎯 Fonctionnalités à Tester

### Homepage
- ✅ Recherche produits
- ✅ Filtrer par catégorie
- ✅ Ajouter au panier
- ✅ Ajouter aux favoris
- ✅ Cliquer sur un produit pour voir détails

### Panier
```
Pages → Cart → Gérer les articles
```

### Favoris
```
Pages → Wishlist → Voir les favoris
```

### Paiement
```
Cart → Checkout → Passer commande
```

### Compte Utilisateur
```
Pages → Login/Signup → Account
```

## 📁 Fichiers Importants

| Fichier | Rôle |
|---------|------|
| `index.html` | Page d'accueil |
| `css/styles.css` | Styles principaux |
| `js/main.js` | Logique principale |
| `js/products-data.js` | Données produits |

## 🔧 Modification Rapide

### Changer la couleur primaire
Éditer `css/styles.css` ligne 3:
```css
--primary-color: #E8722A; /* Changer ici */
```

### Ajouter un produit
Éditer `js/products-data.js`:
```javascript
{
  id: 21,
  name: "Mon nouveau produit",
  category: "electronics",
  price: 99.99,
  // ... autres propriétés
}
```

### Modifier un texte
Chercher le texte dans les fichiers `.html` et modifier directement

## 💾 Données (localStorage)

Accéder à la console (F12) et taper:
```javascript
// Voir le panier
JSON.parse(localStorage.getItem('cart'))

// Voir les favoris
JSON.parse(localStorage.getItem('wishlist'))

// Voir l'utilisateur
JSON.parse(localStorage.getItem('user'))

// Vider le tout
localStorage.clear()
```

## 📱 Tester sur Mobile

### Chrome DevTools
1. F12 → Click device icon
2. Sélectionner device (iPhone, Pixel, etc.)
3. Tester le responsive

### Réel
1. `ipconfig` → Récupérer IP
2. Accéder depuis téléphone: `http://IP_ADDRESS:8000`

## 🚀 Déployer

### Gratuit

#### 1. Netlify
```
1. Allez sur netlify.com
2. Créer compte gratuit
3. Drag & drop le dossier
4. C'est live!
```

#### 2. GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/shophub.git
git push -u origin main
```

#### 3. Vercel
```bash
npm i -g vercel
vercel
# Suivre les instructions
```

## ❓ Problèmes Courants

### CSS ne charge pas
- Vérifier les chemins (utiliser `../`)
- Vider le cache (Ctrl+Shift+Delete)

### Panier vide
- Utiliser localStorage (F12 → Application)
- Rafraîchir la page

### Images ne s'affichent pas
- Remplacer URLs placeholder par vos images
- Vérifier le chemin d'accès

### Problème de responsive
- Appuyer sur F12 et changer viewport
- Redimensionner le navigateur

## 📞 Support

- 📧 Email: support@shophub.fr
- 📞 Tel: +33 1 23 45 67 89
- 🌐 Web: pages/contact.html

## 📚 Documentation Complète

Voir aussi:
- `README.md` - Description générale
- `DEVELOPMENT.md` - Guide développeur
- `TESTING.md` - Test et validation

---

**Bienvenue sur ShopHub!** 🎉
