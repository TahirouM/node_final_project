const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const Product = require('../../src/models/Product');

describe('Product Endpoints', () => {
  let adminToken;
  let userToken;

  beforeEach(async () => {
    // Create admin user
    await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin123'
      });

    adminToken = adminRes.body.data.token;

    // Create regular user
    await User.create({
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'user123'
      });

    userToken = userRes.body.data.token;
  });

  describe('GET /api/products', () => {
    beforeEach(async () => {
      await Product.create([
        {
          name: 'Bracelet Classic',
          description: 'Classic NFC bracelet',
          price: 29.99,
          category: 'bracelet',
          inStock: true
        },
        {
          name: 'Bracelet Premium',
          description: 'Premium NFC bracelet',
          price: 49.99,
          category: 'bracelet',
          inStock: true
        }
      ]);
    });

    it('should get all products', async () => {
      const res = await request(app)
        .get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });

    it('should filter products by category', async () => {
      const res = await request(app)
        .get('/api/products?category=bracelet');

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(2);
    });

    it('should paginate products', async () => {
      const res = await request(app)
        .get('/api/products?page=1&limit=1');

      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.pages).toBe(2);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should get single product', async () => {
      const product = await Product.create({
        name: 'Test Bracelet',
        description: 'Test description',
        price: 29.99,
        category: 'bracelet'
      });

      const res = await request(app)
        .get(`/api/products/${product._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Bracelet');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .get(`/api/products/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/products', () => {
    it('should create product as admin', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'New Bracelet',
          description: 'New description',
          price: 39.99,
          category: 'bracelet',
          variants: [
            { color: 'Black', size: 'M', stock: 10 }
          ]
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('New Bracelet');
    });

    it('should not create product as regular user', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'New Bracelet',
          description: 'New description',
          price: 39.99,
          category: 'bracelet'
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should not create product without authentication', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'New Bracelet',
          description: 'New description',
          price: 39.99,
          category: 'bracelet'
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product as admin', async () => {
      const product = await Product.create({
        name: 'Old Name',
        description: 'Old description',
        price: 29.99,
        category: 'bracelet'
      });

      const res = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Name',
          price: 34.99
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe('Updated Name');
      expect(res.body.data.price).toBe(34.99);
    });

    it('should not update product as regular user', async () => {
      const product = await Product.create({
        name: 'Test',
        description: 'Test',
        price: 29.99,
        category: 'bracelet'
      });

      const res = await request(app)
        .put(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Hacked'
        });

      expect(res.statusCode).toBe(403);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product as admin', async () => {
      const product = await Product.create({
        name: 'To Delete',
        description: 'Will be deleted',
        price: 29.99,
        category: 'bracelet'
      });

      const res = await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });

    it('should not delete product as regular user', async () => {
      const product = await Product.create({
        name: 'Test',
        description: 'Test',
        price: 29.99,
        category: 'bracelet'
      });

      const res = await request(app)
        .delete(`/api/products/${product._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.statusCode).toBe(403);
    });
  });
});
