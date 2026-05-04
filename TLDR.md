# Smart Identity - TL;DR 🚀

Application NFC full-stack : Nuxt 3 + Node.js/Express + MongoDB

## Quick Start (2 minutes)

### 1. Prérequis
- Node.js 24+
- MongoDB en cours d'exécution

### 2. Installation & Démarrage

```bash
# Cloner et accéder au projet
cd node_final_project

# Lancer le script de démarrage automatique
chmod +x start.sh
./start.sh
```

**OU manuellement :**

```bash
# Terminal 1 - Backend
cd backend && npm install && npm run seed -- -i && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

### 3. Accès
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## Comptes de Test

| Type | Email | Mot de passe |
|------|-------|--------------|
| User | test@example.com | test123 |
| Admin | admin@smartidentity.com | admin123 |

## Fonctionnalités Clés

### Site Marketing ✅
- Accueil, Features, About, Contact
- Design responsive Tailwind

### E-commerce ✅
- Catalogue produits + panier persistant
- Checkout avec auth obligatoire

### SaaS ✅
- Dashboard avec stats (vues, scans)
- Création profil public personnalisable
- Activation bracelets NFC
- Profil public : `/profile/[username]`

## API Principale

```bash
POST /api/auth/register    # Inscription
POST /api/auth/login       # Connexion → JWT
GET  /api/auth/me          # User connecté (protégé)

GET  /api/products         # Liste produits
POST /api/orders           # Créer commande (protégé)

POST /api/profiles         # Créer profil (protégé)
GET  /api/profiles/public/:url  # Profil public

POST /api/bracelets/activate    # Activer NFC (protégé)
```

## Tests

```bash
cd backend && npm test
# 30+ tests d'intégration ✅
```

## Stack Technique

**Frontend:** Nuxt 3, Vue 3, Pinia, Tailwind CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT
**Tests:** Jest, Supertest

## Scénario de Démo (3 min)

1. S'inscrire → auto-login
2. Dashboard → Créer profil (titre, bio, liens, thème)
3. Mes Bracelets → Générer code → Activer
4. Voir profil public : `/profile/mon-url`
5. Boutique → Ajouter au panier → Commander
6. Mes Commandes → Voir historique

## Troubleshooting

**MongoDB not running?**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Port occupé?**
- Backend: Changer `PORT` dans `backend/.env`
- Frontend: Nuxt auto-configure

## Architecture

```
Backend (Port 5000)
├── 6 Modèles Mongoose
├── 30+ Endpoints REST
├── JWT Auth + Middlewares
└── Tests automatisés

Frontend (Port 3000)
├── 3 Layouts
├── 15+ Pages
├── 5 Stores Pinia
└── Responsive Design
```

## Note Importante

⚠️ **Projet de démonstration**
- Paiement simulé
- NFC simulé (codes générés)
- MongoDB local (pas de cloud)

---

**Pour plus de détails:** Voir [README.md](./README.md)
