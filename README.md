# Smart Identity — Bracelet NFC

Solution phygitale : bracelet NFC connecté à un profil digital partageable. Projet académique EEMI (Vue/Nuxt + Node/Express + MongoDB).

## Architecture

```
backend/   Node.js + Express + MongoDB (Mongoose) + JWT
frontend/  Nuxt 3 + Pinia + Tailwind CSS
```

**Backend** — `src/` : `models/` · `controllers/` · `routes/` · `middlewares/` · `services/` · `tests/`  
**Frontend** — `pages/` · `components/` · `stores/` · `composables/` · `middleware/` · `layouts/`

## Fonctionnalités

**Marketing** — accueil, fonctionnalités, à propos, contact (SEO, responsive)  
**E-commerce** — catalogue, fiche produit, panier (localStorage), checkout, historique commandes  
**SaaS** — dashboard, profil public personnalisable, activation bracelet NFC, stats vues/scans  
**Auth unique** — JWT partagé entre SaaS et e-commerce

## Installation

```bash
./start.sh
```

Variables `.env` backend : `MONGO_URI`, `JWT_SECRET`, `PORT=5000`, `CLIENT_URL=http://localhost:3000`

## Comptes de test (après seed)

| Rôle  | Email | Mot de passe |
|-------|-------|--------------|
| User  | test@example.com | test123 |
| Admin | admin@smartidentity.com | admin123 |

## API — Endpoints principaux

| Méthode | Route | Auth |
|---------|-------|------|
| POST | `/api/auth/register` | — |
| POST | `/api/auth/login` | — |
| GET | `/api/auth/me` | JWT |
| GET | `/api/profiles/public/:url` | — |
| GET/POST/PUT/DELETE | `/api/profiles` | JWT |
| POST | `/api/bracelets/activate` | JWT |
| GET | `/api/products` | — |
| POST | `/api/orders` | JWT |

## Tests

```bash
cd backend && npm test
```

Couvre : auth, profils, produits, commandes (Jest + Supertest).
