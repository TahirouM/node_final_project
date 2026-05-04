require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const { generateNfcId } = require('../services/nfcService');

// Sample products
const products = [
  {
    name: 'Smart Identity Bracelet - Classic',
    description: 'Notre bracelet NFC classique en silicone durable. Partagez votre profil professionnel en un simple tap. Étanche et confortable pour un port quotidien.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343f'
    ],
    category: 'bracelet',
    variants: [
      { color: 'Noir', size: 'M', stock: 50 },
      { color: 'Noir', size: 'L', stock: 45 },
      { color: 'Bleu', size: 'M', stock: 30 },
      { color: 'Bleu', size: 'L', stock: 25 }
    ],
    inStock: true
  },
  {
    name: 'Smart Identity Bracelet - Premium',
    description: 'Version premium en cuir véritable avec puce NFC intégrée. Design élégant pour les professionnels exigeants. Disponible en plusieurs couleurs.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343f'
    ],
    category: 'bracelet',
    variants: [
      { color: 'Noir', size: 'M', stock: 20 },
      { color: 'Noir', size: 'L', stock: 15 },
      { color: 'Marron', size: 'M', stock: 18 },
      { color: 'Marron', size: 'L', stock: 12 }
    ],
    inStock: true
  },
  {
    name: 'Smart Identity Bracelet - Sport',
    description: 'Bracelet sport ultra-léger et résistant. Parfait pour les événements sportifs et le networking actif. Résiste à l\'eau et aux chocs.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    ],
    category: 'bracelet',
    variants: [
      { color: 'Rouge', size: 'M', stock: 40 },
      { color: 'Rouge', size: 'L', stock: 35 },
      { color: 'Vert', size: 'M', stock: 28 },
      { color: 'Vert', size: 'L', stock: 22 }
    ],
    inStock: true
  },
  {
    name: 'Pack Starter - 3 Bracelets',
    description: 'Pack économique incluant 3 bracelets classiques. Idéal pour les équipes ou les événements. Couleurs assorties.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    ],
    category: 'bundle',
    variants: [
      { color: 'Mixte', size: 'M', stock: 15 },
      { color: 'Mixte', size: 'L', stock: 12 }
    ],
    inStock: true
  }
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Data cleared');

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products created`);

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@smartidentity.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });
    console.log('✅ Admin user created (admin@smartidentity.com / admin123)');

    // Create test user
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user'
    });
    console.log('✅ Test user created (test@example.com / test123)');

    // Generate 5 sample NFC IDs for testing
    console.log('\\n📝 Sample NFC IDs for testing:');
    for (let i = 0; i < 5; i++) {
      console.log(`   ${i + 1}. ${generateNfcId()}`);
    }

    console.log('\\n🎉 Data import complete!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️  Data cleared successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Usage:');
  console.log('  node src/utils/seeder.js -i    Import data');
  console.log('  node src/utils/seeder.js -d    Delete data');
  process.exit();
}
