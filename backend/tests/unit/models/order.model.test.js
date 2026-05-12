const mongoose = require('mongoose');
const Order = require('../../../src/models/Order');
const User = require('../../../src/models/User');
const Product = require('../../../src/models/Product');

describe('Order Model', () => {
  let userId;
  let productId;

  beforeEach(async () => {
    const user = await User.create({ email: 'order@example.com', password: 'pass123' });
    userId = user._id;

    const product = await Product.create({
      name: 'Bracelet Test',
      description: 'Test',
      price: 29.99,
      category: 'bracelet'
    });
    productId = product._id;
  });

  it('should create a valid order', async () => {
    const order = await Order.create({
      user: userId,
      items: [{ product: productId, quantity: 2, price: 29.99 }],
      totalPrice: 59.98,
      shippingAddress: { street: '1 Rue Test', city: 'Paris', postalCode: '75001', country: 'France' }
    });
    expect(order._id).toBeDefined();
    expect(order.status).toBe('pending');
  });

  it('should require a user', async () => {
    const order = new Order({
      items: [{ product: productId, quantity: 1, price: 10 }],
      totalPrice: 10,
      shippingAddress: { street: '1 Rue', city: 'Paris', postalCode: '75000', country: 'France' }
    });
    await expect(order.save()).rejects.toThrow();
  });

  it('should require shipping address fields', async () => {
    const order = new Order({
      user: userId,
      items: [{ product: productId, quantity: 1, price: 10 }],
      totalPrice: 10,
      shippingAddress: { city: 'Paris' }
    });
    await expect(order.save()).rejects.toThrow();
  });

  it('should only accept valid status values', async () => {
    const order = new Order({
      user: userId,
      items: [{ product: productId, quantity: 1, price: 10 }],
      totalPrice: 10,
      status: 'invalid_status',
      shippingAddress: { street: '1 Rue', city: 'Paris', postalCode: '75000', country: 'France' }
    });
    await expect(order.save()).rejects.toThrow();
  });

  it('should not allow negative quantity', async () => {
    const order = new Order({
      user: userId,
      items: [{ product: productId, quantity: -1, price: 10 }],
      totalPrice: -10,
      shippingAddress: { street: '1 Rue', city: 'Paris', postalCode: '75000', country: 'France' }
    });
    await expect(order.save()).rejects.toThrow();
  });
});
