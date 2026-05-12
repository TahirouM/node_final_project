# QA_NOTES — Smart Identity

## Partie 1 — Stratégie QA

### 1. Types de tests utilisés

#### Tests unitaires
Testent une unité de code isolée (fonction, modèle, composant) sans dépendances externes.
- **Backend** : modèles Mongoose (validations, hooks, méthodes), service NFC
- **Frontend** : composants Vue (AppAlert, AppLoader, StatCard), composable useNfc

#### Tests d'intégration
Testent les interactions entre plusieurs composants du système.
- **Backend** : routes Express + middlewares + MongoDB (via Supertest) — auth, profils, produits, commandes
- **Frontend** : stores Pinia avec appels API mockés (authStore)

#### Tests fonctionnels
Vérifient qu'une fonctionnalité répond aux exigences métier de bout en bout au niveau API.
- Couverts par les tests d'intégration backend (ex: création commande avec calcul prix total, accès profil public avec incrément de vues)

#### Tests end-to-end (E2E)
Simulent un vrai utilisateur dans un navigateur réel, sur l'application complète.
- **Outil** : Playwright (Chromium)
- **Scénarios** : inscription, connexion, erreur de connexion, navigation dashboard, profil public

### 2. Risques identifiés dans l'application

| Risque | Sévérité | Couvert par |
|--------|----------|-------------|
| Token JWT invalide ou expiré | Haute | Integration auth (route protégée sans/avec token) |
| Accès à la ressource d'un autre utilisateur | Haute | Integration orders, profiles (403 attendu) |
| Mot de passe non haché en base | Haute | Unit User model (hash vérifié) |
| Email dupliqué à l'inscription | Moyenne | Integration auth + Unit model |
| Commande avec produit hors stock | Moyenne | Integration orders |
| Profil privé accessible publiquement | Moyenne | Integration profiles |
| Validation manquante (champs requis) | Moyenne | Integration (400 attendu) |
| Erreur de permission (user → admin) | Haute | Integration products (403 attendu) |
| État frontend non réinitialisé à la déconnexion | Moyenne | Unit authStore (logout) |
| NFC ID format invalide | Faible | Unit nfcService |

### 3. Stratégie de tests

#### Ce qui est testé en priorité
1. **Authentification** (JWT, login, register, routes protégées) — risque le plus élevé
2. **Contrôle d'accès** (403 user vs admin, isolation des données utilisateur)
3. **CRUD complet** (produits, commandes, profils)
4. **Validations métier** (stock, doublons, champs requis)
5. **Modèles Mongoose** (contraintes, hooks, méthodes)
6. **Composants UI** (rendu, props, états)

#### Ce qui n'est pas testé (et pourquoi)
- Tests de charge / performance → hors scope pour un projet académique
- Tests visuels de régression (screenshot diff) → complexité non justifiée ici
- Tests sur Mobile Safari / Firefox → seul Chromium en CI pour la rapidité
- Couverture exhaustive des pages Nuxt → priorité aux stores et composants réutilisables

#### Choix techniques
| Outil | Raison |
|-------|--------|
| **Jest + Supertest** | Standard Node.js/Express, parfait pour tester des routes HTTP avec une vraie DB |
| **MongoDB en mémoire** | Isolation réelle sans mock fragile, nettoyage après chaque test |
| **Vitest** | Compatible ESM/Vue 3, intégration naturelle avec Vite, ultra-rapide |
| **@vue/test-utils** | Librairie officielle Vue pour monter des composants en test |
| **Playwright** | E2E cross-browser, API moderne, capture screenshots/traces automatique |
| **GitHub Actions** | CI gratuit, intégration native GitHub, MongoDB service container disponible |

---

## Partie 2 — Tests Backend

**Commande** : `cd backend && npm test`

### Couverture des tests d'intégration

| Fichier | Scénarios |
|---------|-----------|
| `auth.test.js` | Register OK, email dupliqué, champs manquants, login OK, mauvais mot de passe, utilisateur inexistant, route /me avec token valide/invalide/absent |
| `products.test.js` | GET liste + filtres + pagination, GET par ID + 404, POST admin OK, POST user 403, POST sans auth 401, PUT admin, PUT user 403, DELETE admin, DELETE user 403 |
| `orders.test.js` | POST commande OK (prix calculé), sans items 400, produit hors stock 400, sans auth 401, GET mes commandes, accès commande d'un autre user 403 |
| `profiles.test.js` | POST profil OK, double profil 400, sans auth 401, GET my-profile OK + 404, GET profil public (vues++), profil privé 404, PUT own OK, PUT autre user 403 |

### Couverture des tests unitaires

| Fichier | Scénarios |
|---------|-----------|
| `user.model.test.js` | Création valide, hash password, comparePassword, email requis, password requis, unicité email, longueur min password, fullName virtual, role par défaut, non re-hashage |
| `order.model.test.js` | Création valide, user requis, adresse requise, status invalide, quantité négative |
| `nfcService.test.js` | Format NFC-XXXXXXXX, unicité, longueur 12, validation format correct/incorrect |

---

## Partie 3 — Tests Frontend

**Commande** : `cd frontend && npm test`

### Tests unitaires composants

| Fichier | Composant | Scénarios |
|---------|-----------|-----------|
| `AppAlert.test.js` | AppAlert | Rendu vide, message affiché, styles error/success/info/warning, icône SVG |
| `AppLoader.test.js` | AppLoader | Spinner visible, label affiché/caché, classe py-20 |
| `StatCard.test.js` | StatCard | Label, valeur number/string, sublabel, couleur custom, slot icon |
| `useNfc.test.js` | useNfc | Format NFC ID, unicité, getProfileUrl, getQrCodeUrl |

### Tests d'intégration store

| Fichier | Store | Scénarios |
|---------|-------|-----------|
| `authStore.test.js` | useAuthStore | État initial, login OK, login erreur, logout, isAdmin true/false, fetchMe OK, fetchMe erreur → logout |

---

## Partie 4 — Tests E2E

**Commande** : `cd frontend && npm run test:e2e`

### Scénario complet testé

1. Inscription d'un nouvel utilisateur → redirection dashboard
2. Connexion avec identifiants valides → dashboard
3. Erreur visible avec mauvais mot de passe
4. Redirection si non authentifié sur route protégée
5. Navigation vers la boutique depuis le dashboard
6. Page d'accueil accessible sans auth
7. Profil inexistant → gestion d'erreur

---

## Partie 5 — CI/CD

**Fichier** : `.github/workflows/ci.yml`

Pipeline déclenché à chaque push sur `main` et `develop`, et sur chaque Pull Request :

1. **Job `backend-tests`** : Lance MongoDB 7.0 en service container, installe les dépendances, exécute `npm test` avec couverture
2. **Job `frontend-tests`** : Installe les dépendances, exécute `npm test` (Vitest) avec couverture
3. **Job `e2e-tests`** (après les deux précédents) : Lance le backend + seed, installe Playwright, exécute les tests E2E en Chromium

Les rapports de couverture et les traces Playwright sont uploadés en artefacts GitHub Actions.
