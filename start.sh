#!/bin/bash

# Smart Identity - Script de démarrage automatique
# Ce script démarre le backend et le frontend en parallèle

echo "🚀 Smart Identity - Démarrage automatique"
echo "=========================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installer Node.js depuis https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Vérifier si MongoDB est en cours d'exécution
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB ne semble pas en cours d'exécution${NC}"
    echo "Démarrage de MongoDB..."

    # Essayer de démarrer MongoDB selon l'OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew services start mongodb-community 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log 2>/dev/null
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start mongod 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log 2>/dev/null
    fi

    sleep 2

    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${RED}❌ Impossible de démarrer MongoDB automatiquement${NC}"
        echo "Veuillez démarrer MongoDB manuellement avant de continuer."
        exit 1
    fi
fi

echo -e "${GREEN}✅ MongoDB est en cours d'exécution${NC}"
echo ""

# Backend Setup
echo -e "${BLUE}📦 Configuration du Backend...${NC}"
cd backend

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances backend..."
    npm install
fi

# Copier .env si nécessaire
if [ ! -f ".env" ]; then
    echo "Création du fichier .env..."
    cp .env.example .env
fi

# Importer les données de test
echo "Import des données de démonstration..."
npm run seed -- -i > /dev/null 2>&1

echo -e "${GREEN}✅ Backend configuré${NC}"
echo ""

# Frontend Setup
echo -e "${BLUE}📦 Configuration du Frontend...${NC}"
cd ../frontend

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances frontend..."
    npm install
fi

# Copier .env si nécessaire
if [ ! -f ".env" ]; then
    echo "Création du fichier .env..."
    cp .env.example .env
fi

echo -e "${GREEN}✅ Frontend configuré${NC}"
echo ""

# Retour au dossier racine
cd ..

# Créer un script temporaire pour gérer les processus
cat > /tmp/smart-identity-start.sh << 'EOF'
#!/bin/bash

# Fonction pour nettoyer les processus à la sortie
cleanup() {
    echo ""
    echo "🛑 Arrêt des serveurs..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Démarrer le backend
cd backend
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# Démarrer le frontend
cd ../frontend
npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!

# Attendre que le frontend démarre
sleep 5

# Afficher les informations
clear
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║           🎉 Smart Identity est en cours d'exécution       ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Frontend : http://localhost:3000"
echo "📍 Backend  : http://localhost:5001"
echo ""
echo "👤 Comptes de test :"
echo "   User  : test@example.com / test123"
echo "   Admin : admin@smartidentity.com / admin123"
echo ""
echo "📝 Logs :"
echo "   Backend  : tail -f /tmp/backend.log"
echo "   Frontend : tail -f /tmp/frontend.log"
echo ""
echo "⏹️  Appuyez sur Ctrl+C pour arrêter les serveurs"
echo ""

# Afficher les logs en temps réel
tail -f /tmp/backend.log /tmp/frontend.log &
TAIL_PID=$!

# Attendre
wait
EOF

chmod +x /tmp/smart-identity-start.sh

# Afficher un message et démarrer
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}║              🚀 Démarrage de l'application...              ║${NC}"
echo -e "${GREEN}║                                                            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Patientez quelques secondes..."
echo ""

# Exécuter le script
exec /tmp/smart-identity-start.sh
