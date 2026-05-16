#!/usr/bin/env python3
import os
from PIL import Image
import shutil

# Dossiers
SOURCE_DIR = "e-commerce page"
OUTPUT_DIR = "assets/images"

# Créer le dossier output s'il n'existe pas
os.makedirs(OUTPUT_DIR, exist_ok=True)

def crop_and_save(image_path, output_name, crop_box=None, resize=None):
    """Croppe et sauvegarde une image"""
    try:
        img = Image.open(image_path)
        
        # Cropper si des coordonnées sont fournies
        if crop_box:
            img = img.crop(crop_box)
        
        # Redimensionner si nécessaire
        if resize:
            img = img.resize(resize, Image.Resampling.LANCZOS)
        
        output_path = os.path.join(OUTPUT_DIR, output_name)
        img.save(output_path, quality=85, optimize=True)
        print(f"✓ Sauvegardé: {output_name}")
        return output_path
    except Exception as e:
        print(f"✗ Erreur avec {image_path}: {e}")
        return None

# 1. HERO IMAGE - E-Commerce HomePage
hero_src = os.path.join(SOURCE_DIR, "E-Commerce HomePage.jpg")
if os.path.exists(hero_src):
    img = Image.open(hero_src)
    width, height = img.size
    # Cropper la zone supérieure (bannière hero)
    crop_box = (0, 0, width, int(height * 0.4))
    crop_and_save(hero_src, "hero-banner.jpg", crop_box, (1200, 400))
    print(f"Image hero créée (taille originale: {width}x{height})")

# 2. PRODUCT IMAGES - Cropper de Product Details page
product_src = os.path.join(SOURCE_DIR, "Product Details page.jpg")
if os.path.exists(product_src):
    img = Image.open(product_src)
    width, height = img.size
    print(f"Product Details dimensions: {width}x{height}")
    
    # Créer plusieurs images de produits en divisant la page
    # Zone produit principal (côté gauche)
    crop_and_save(product_src, "product-1.jpg", (50, 100, int(width*0.5), int(height*0.7)), (300, 300))
    
    # Zone description (droite)
    crop_and_save(product_src, "product-2.jpg", (int(width*0.5), 100, width-50, int(height*0.7)), (300, 300))

# 3. CATEGORY IMAGES
categories = {
    "Cart.jpg": "cart-empty.jpg",
    "Wishlist.jpg": "wishlist-page.jpg",
    "About.jpg": "about-hero.jpg",
    "Contact.jpg": "contact-hero.jpg",
    "Account.jpg": "account-hero.jpg",
}

for src_file, dest_file in categories.items():
    src_path = os.path.join(SOURCE_DIR, src_file)
    if os.path.exists(src_path):
        img = Image.open(src_path)
        width, height = img.size
        # Cropper la zone supérieure (hero section)
        crop_box = (0, 0, width, int(height * 0.35))
        crop_and_save(src_path, dest_file, crop_box, (1200, 350))

# 4. Copier l'image hero complète aussi
if os.path.exists(hero_src):
    shutil.copy(hero_src, os.path.join(OUTPUT_DIR, "E-Commerce HomePage.jpg"))
    print("✓ Image homepage complète copiée")

# 5. Créer des images de produits génériques si besoin
# Images pour les différents produits
product_names = [
    ("Casque Audio", "product-headphones.jpg"),
    ("Montre Intelligente", "product-watch.jpg"),
    ("Robe Noire", "product-dress.jpg"),
    ("Baskets Sport", "product-shoes.jpg"),
    ("Lampe LED", "product-lamp.jpg"),
    ("Coussin Ergonomique", "product-pillow.jpg"),
]

print("\n✓ Traitement des images terminé!")
print(f"✓ Images sauvegardées dans: {OUTPUT_DIR}/")
