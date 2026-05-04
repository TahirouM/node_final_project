const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const Product = require('../../src/models/Product');
const Order = require('../../src/models/Order');

describe('Order Endpoints', () => {
  let token;
  let userId;
  let productId;

  beforeEach(async () => {
    // Create user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user._id;

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    token = res.body.data.token;

    // Create product
    const product = await Product.create({
      name: 'Test Bracelet',
      description: 'Test description',
      price: 29.99,
      category: 'bracelet',
      inStock: true
    });
    productId = product._id;
  });

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
          items: [
            {
              product: productId,
              variant: { color: 'Black', size: 'M' },
              quantity: 2
            }
          ],
          shippingAddress: {
            street: '123 Main St',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
          }
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.items).toHaveLength(1);
      expect(res.body.data.totalPrice).toBe(59.98); // 29.99 * 2
    });

    it('should not create order without items', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
          items: [],
          shippingAddress: {
            street: '123 Main St',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
          }
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not create order with out-of-stock product', async () => {
      // Update product to out of stock
      await Product.findByIdAndUpdate(productId, { inStock: false });

      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
          items: [
            {
              product: productId,
              quantity: 1
            }
          ],
          shippingAddress: {
            street: '123 Main St',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
          }
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not create order without authentication', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          items: [
            {
              product: productId,
              quantity: 1
            }
          ],
          shippingAddress: {
            street: '123 Main St',
            city: 'Paris',
            postalCode: '75001',
            country: 'France'
          }
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/orders/my-orders', () => {
    beforeEach(async () => {
      // Create test order
      await Order.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
            price: 29.99
          }
        ],
        totalPrice: 29.99,
        shippingAddress: {
          street: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        }
      });
    });

    it('should get user orders', async () => {
      const res = await request(app)
        .get('/api/orders/my-orders')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data).toHaveLength(1);
    });

    it('should not get orders without authentication', async () => {
      const res = await request(app)
        .get('/api/orders/my-orders');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get own order', async () => {
      const order = await Order.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
            price: 29.99
          }
        ],
        totalPrice: 29.99,
        shippingAddress: {
          street: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        }
      });

      const res = await request(app)
        .get(`/api/orders/${order._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(order._id.toString());
    });

    it('should not get another user order', async () => {
      // Create another user
      const otherUser = await User.create({
        email: 'other@example.com',
        password: 'password123'
      });

      const order = await Order.create({
        user: otherUser._id,
        items: [
          {
            product: productId,
            quantity: 1,
            price: 29.99
          }
        ],
        totalPrice: 29.99,
        shippingAddress: {
          street: '123 Main St',
          city: 'Paris',
          postalCode: '75001',
          country: 'France'
        }
      });

      const res = await request(app)
        .get(`/api/orders/${order._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
