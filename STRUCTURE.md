# Smart Identity - Structure Complète du Projet 📁

## 📂 Vue d'Ensemble

```
node_final_project/
├── 📄 README.md                    # Documentation principale
├── 📄 TLDR.md                      # Guide rapide
├── 📄 PRESENTATION.md              # Guide de présentation
├── 📄 CHECKLIST.md                 # Checklist de vérification
├── 📄 STRUCTURE.md                 # Ce fichier
├── 🔧 start.sh                     # Script démarrage (Unix)
├── 🔧 start.bat                    # Script démarrage (Windows)
├── 🚫 .gitignore                   # Exclusions Git
├── 📁 backend/                     # API Backend
└── 📁 frontend/                    # Application Frontend
```

---

## 🔙 Backend - API Node.js/Express

```
backend/
├── 📄 package.json                 # Dépendances et scripts
├── 📄 .env.example                 # Variables d'environnement template
├── 📄 .env                         # Variables d'environnement (généré)
├── 🚫 .gitignore                   # Exclusions Git backend
│
├── 📁 src/                         # Code source
│   │
│   ├── 🔧 server.js                # Point d'entrée principal
│   │
│   ├── 📁 config/                  # Configuration
│   │   ├── database.js             # Connexion MongoDB
│   │   └── jwt.js                  # Configuration JWT
│   │
│   ├── 📁 models/                  # Modèles Mongoose (6 modèles)
│   │   ├── User.js                 # Utilisateurs (auth)
│   │   ├── UserProfile.js          # Profils publics
│   │   ├── NfcBracelet.js          # Bracelets NFC
│   │   ├── Product.js              # Produits (e-commerce)
│   │   ├── Order.js                # Commandes
│   │   └── MarketingContent.js     # Contenu marketing (optionnel)
│   │
│   ├── 📁 controllers/             # Logique métier (7 controllers)
│   │   ├── authController.js       # Authentification (register, login, me)
│   │   ├── profileController.js    # Gestion profils
│   │   ├── braceletController.js   # Activation bracelets
│   │   ├── productController.js    # CRUD produits
│   │   └── orderController.js      # Gestion commandes
│   │
│   ├── 📁 routes/                  # Routes API (5 groupes)
│   │   ├── auth.js                 # Routes authentification
│   │   ├── profiles.js             # Routes profils
│   │   ├── bracelets.js            # Routes bracelets
│   │   ├── products.js             # Routes produits
│   │   └── orders.js               # Routes commandes
│   │
│   ├── 📁 middlewares/             # Middlewares (5)
│   │   ├── auth.js                 # Protection JWT + authorize
│   │   ├── errorHandler.js         # Gestion centralisée erreurs
│   │   ├── logger.js               # Logs Morgan
│   │   └── validator.js            # Validation données (optionnel)
│   │
│   ├── 📁 services/                # Services métier (2)
│   │   └── nfcService.js           # Génération/validation codes NFC
│   │
│   └── 📁 utils/                   # Utilitaires
│       └── seeder.js               # Import données de test
│
└── 📁 tests/                       # Tests automatisés
    ├── setup.js                    # Configuration tests
    │
    ├── 📁 unit/                    # Tests unitaires
    │   ├── models/                 # Tests modèles
    │   └── services/               # Tests services
    │
    └── 📁 integration/             # Tests d'intégration (4 fichiers)
        ├── auth.test.js            # Tests authentification
        ├── profiles.test.js        # Tests profils
        ├── products.test.js        # Tests produits
        └── orders.test.js          # Tests commandes
```

### 📊 Backend - Statistiques

- **Modèles** : 6 fichiers
- **Controllers** : 5 fichiers
- **Routes** : 5 fichiers
- **Middlewares** : 5 fichiers
- **Services** : 2 fichiers
- **Tests** : 5 fichiers (30+ tests)
- **Endpoints API** : 30+
- **Total lignes** : ~2500

---

## 🎨 Frontend - Application Nuxt 3

```
frontend/
├── 📄 package.json                 # Dépendances et scripts
├── 📄 nuxt.config.ts               # Configuration Nuxt
├── 📄 tailwind.config.js           # Configuration Tailwind
├── 📄 .env.example                 # Variables d'environnement template
├── 📄 .env                         # Variables d'environnement (généré)
├── 🚫 .gitignore                   # Exclusions Git frontend
├── 🔧 app.vue                      # Composant racine
│
├── 📁 assets/                      # Assets statiques
│   └── css/
│       └── main.css                # CSS global Tailwind
│
├── 📁 public/                      # Fichiers publics statiques
│   └── favicon.ico
│
├── 📁 layouts/                     # Layouts (3)
│   ├── default.vue                 # Layout site marketing
│   └── dashboard.vue               # Layout SaaS avec sidebar
│
├── 📁 pages/                       # Pages de l'application
│   │
│   ├── index.vue                   # 🏠 Accueil (marketing)
│   ├── features.vue                # ✨ Fonctionnalités
│   ├── about.vue                   # ℹ️ À propos
│   ├── contact.vue                 # 📧 Contact
│   │
│   ├── 📁 auth/                    # Authentification (2 pages)
│   │   ├── login.vue               # 🔐 Connexion
│   │   └── register.vue            # ✍️ Inscription
│   │
│   ├── 📁 shop/                    # E-commerce (5 pages)
│   │   ├── index.vue               # 🛍️ Catalogue produits
│   │   ├── [id].vue                # 📦 Détail produit
│   │   ├── cart.vue                # 🛒 Panier
│   │   ├── checkout.vue            # 💳 Validation commande (protégé)
│   │   └── orders.vue              # 📋 Mes commandes (protégé)
│   │
│   ├── 📁 dashboard/               # SaaS (3 pages protégées)
│   │   ├── index.vue               # 📊 Dashboard accueil
│   │   ├── profile.vue             # 👤 Gestion profil
│   │   └── bracelets.vue           # 📱 Gestion bracelets NFC
│   │
│   └── 📁 profile/                 # Profils publics
│       └── [username].vue          # 🌐 Profil public accessible
│
├── 📁 components/                  # Composants réutilisables
│   ├── marketing/                  # Composants marketing
│   ├── shop/                       # Composants e-commerce
│   ├── saas/                       # Composants SaaS
│   └── common/                     # Composants partagés
│
├── 📁 stores/                      # Stores Pinia (5)
│   ├── auth.js                     # 🔐 State authentification
│   ├── cart.js                     # 🛒 State panier
│   ├── profile.js                  # 👤 State profils
│   ├── products.js                 # 🛍️ State produits
│   └── orders.js                   # 📋 State commandes
│
├── 📁 composables/                 # Composables Vue (4)
│   ├── useApi.js                   # 🔌 Wrapper API axios
│   ├── useToast.js                 # 🔔 Notifications toast
│   └── useNfc.js                   # 📱 Utilitaires NFC
│
├── 📁 middleware/                  # Middlewares de navigation (2)
│   ├── auth.js                     # 🔒 Protection routes (redirect login)
│   └── guest.js                    # 👤 Redirection si connecté
│
└── 📁 plugins/                     # Plugins Nuxt
    └── api.js                      # 🔌 Configuration axios + intercepteurs
```

### 📊 Frontend - Statistiques

**Pages par section :**
- **Marketing** : 4 pages (index, features, about, contact)
- **E-commerce** : 5 pages (catalogue, détail, panier, checkout, commandes)
- **SaaS** : 4 pages (login, register, dashboard, profil, bracelets)
- **Public** : 1 page (profil public)
- **Total** : 15 pages

**Stores Pinia** : 5 stores
**Composables** : 4 composables
**Layouts** : 3 layouts
**Middlewares** : 2 middlewares
**Plugins** : 1 plugin

**Total lignes** : ~3000

---

## 🔄 Flux de Données

### Architecture Communication

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND (Nuxt 3)                  │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  │  Pages   │───▶│  Stores  │───▶│ Plugins  │         │
│  │  (.vue)  │    │ (Pinia)  │    │ (axios)  │         │
│  └──────────┘    └──────────┘    └─────┬────┘         │
│                                         │              │
└─────────────────────────────────────────┼──────────────┘
                                          │
                                    HTTP Request
                                    (JWT Token)
                                          │
┌─────────────────────────────────────────┼──────────────┐
│                      BACKEND (Express)  │              │
│                                         ▼              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐        │
│  │Middleware│───▶│Controller│───▶│  Model   │        │
│  │ (Auth)   │    │          │    │(Mongoose)│        │
│  └──────────┘    └──────────┘    └─────┬────┘        │
│                                         │             │
└─────────────────────────────────────────┼─────────────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │  MongoDB    │
                                   └─────────────┘
```

### Exemple de Flux : Créer une Commande

```
1. USER clique "Passer commande" (checkout.vue)
        ↓
2. PAGE appelle store.createOrder() (orders.js)
        ↓
3. STORE appelle api.post('/orders') (useApi.js)
        ↓
4. PLUGIN ajoute JWT token à la requête (api.js)
        ↓
5. BACKEND reçoit POST /api/orders
        ↓
6. MIDDLEWARE vérifie JWT (auth.js) ✅
        ↓
7. CONTROLLER valide données (orderController.js)
        ↓
8. CONTROLLER vérifie produits en stock
        ↓
9. MODEL crée commande MongoDB (Order.js)
        ↓
10. RESPONSE retourne commande créée
        ↓
11. STORE met à jour state local
        ↓
12. PAGE affiche confirmation + redirect
```

---

## 🗄️ Base de Données MongoDB

### Collections

```
smart-identity (Database)
│
├── 📊 users                    # Utilisateurs
│   ├── _id (ObjectId)
│   ├── email (String, unique)
│   ├── password (String, hashed)
│   ├── firstName (String)
│   ├── lastName (String)
│   ├── role (enum: user/admin)
│   └── timestamps
│
├── 📊 userprofiles             # Profils publics
│   ├── _id (ObjectId)
│   ├── user (ref: users)
│   ├── bracelet (ref: nfcbracelets)
│   ├── publicUrl (String, unique)
│   ├── title (String)
│   ├── bio (String, max 500)
│   ├── avatar (String URL)
│   ├── theme (String hex color)
│   ├── links (Array)
│   ├── stats {views, scans}
│   ├── isPublic (Boolean)
│   └── timestamps
│
├── 📊 nfcbracelets             # Bracelets NFC
│   ├── _id (ObjectId)
│   ├── user (ref: users)
│   ├── nfcId (String, unique)
│   ├── isActive (Boolean)
│   ├── activatedAt (Date)
│   └── timestamps
│
├── 📊 products                 # Produits
│   ├── _id (ObjectId)
│   ├── name (String)
│   ├── description (String)
│   ├── price (Number)
│   ├── images (Array)
│   ├── category (enum)
│   ├── variants (Array)
│   ├── inStock (Boolean)
│   └── timestamps
│
├── 📊 orders                   # Commandes
│   ├── _id (ObjectId)
│   ├── user (ref: users)
│   ├── items (Array)
│   ├── totalPrice (Number)
│   ├── status (enum)
│   ├── shippingAddress (Object)
│   └── timestamps
│
└── 📊 marketingcontents        # Contenu marketing (optionnel)
    ├── _id (ObjectId)
    ├── section (enum)
    ├── content (Mixed)
    ├── isActive (Boolean)
    └── timestamps
```

### Relations

```
User ─┬─▶ UserProfile (1:1)
      │
      ├─▶ NfcBracelet (1:N)
      │
      └─▶ Order (1:N)

UserProfile ──▶ NfcBracelet (1:1)

Order ──▶ Product (N:N via items array)
```

---

## 🎯 Points Clés de l'Architecture

### Backend
✅ **MVC Pattern** : Séparation claire Models/Views/Controllers
✅ **RESTful API** : Endpoints cohérents et standards
✅ **Middleware Chain** : logger → auth → controller → errorHandler
✅ **Service Layer** : Logique métier réutilisable (NFC, Auth)
✅ **Mongoose ODM** : Schémas avec validations intégrées

### Frontend
✅ **Component-Based** : Réutilisation maximale
✅ **State Management** : Pinia pour état global
✅ **Composition API** : Composables réutilisables
✅ **File-Based Routing** : Convention Nuxt automatique
✅ **Layouts System** : Séparation marketing/dashboard

### Sécurité
✅ **JWT Authentication** : Tokens signés et expirables
✅ **Password Hashing** : bcrypt avec salt
✅ **Route Protection** : Middlewares côté frontend + backend
✅ **CORS Configured** : Origine autorisée uniquement
✅ **Input Validation** : Côté client ET serveur

---

**Cette structure garantit un code maintenable, scalable et professionnel ! 🚀**
