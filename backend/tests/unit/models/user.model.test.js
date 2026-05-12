const mongoose = require('mongoose');
const User = require('../../../src/models/User');

describe('User Model', () => {
  it('should create a valid user', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    });
    const saved = await user.save();
    expect(saved._id).toBeDefined();
    expect(saved.email).toBe('test@example.com');
    expect(saved.role).toBe('user');
  });

  it('should hash password before saving', async () => {
    const user = await User.create({
      email: 'hash@example.com',
      password: 'plaintext'
    });
    const userWithPassword = await User.findById(user._id).select('+password');
    expect(userWithPassword.password).not.toBe('plaintext');
    expect(userWithPassword.password).toMatch(/^\$2[ab]\$/);
  });

  it('should compare passwords correctly', async () => {
    const user = await User.create({
      email: 'compare@example.com',
      password: 'mypassword'
    });
    const userWithPassword = await User.findById(user._id).select('+password');
    const isMatch = await userWithPassword.comparePassword('mypassword');
    const isNoMatch = await userWithPassword.comparePassword('wrongpass');
    expect(isMatch).toBe(true);
    expect(isNoMatch).toBe(false);
  });

  it('should require email', async () => {
    const user = new User({ password: 'password123' });
    await expect(user.save()).rejects.toThrow();
  });

  it('should require password', async () => {
    const user = new User({ email: 'nopass@example.com' });
    await expect(user.save()).rejects.toThrow();
  });

  it('should enforce email uniqueness', async () => {
    await User.create({ email: 'unique@example.com', password: 'pass123' });
    const duplicate = new User({ email: 'unique@example.com', password: 'pass456' });
    await expect(duplicate.save()).rejects.toThrow();
  });

  it('should enforce minimum password length', async () => {
    const user = new User({ email: 'short@example.com', password: 'abc' });
    await expect(user.save()).rejects.toThrow();
  });

  it('should compute fullName virtual', async () => {
    const user = new User({ email: 'full@example.com', password: 'pass123', firstName: 'Jane', lastName: 'Smith' });
    expect(user.fullName).toBe('Jane Smith');
  });

  it('should default role to user', async () => {
    const user = await User.create({ email: 'role@example.com', password: 'pass123' });
    expect(user.role).toBe('user');
  });

  it('should accept admin role', async () => {
    const user = await User.create({ email: 'admin@example.com', password: 'pass123', role: 'admin' });
    expect(user.role).toBe('admin');
  });

  it('should not rehash password if not modified', async () => {
    const user = await User.create({ email: 'rehash@example.com', password: 'mypassword' });
    const userWithPass = await User.findById(user._id).select('+password');
    const originalHash = userWithPass.password;
    userWithPass.firstName = 'Updated';
    await userWithPass.save();
    const reloaded = await User.findById(user._id).select('+password');
    expect(reloaded.password).toBe(originalHash);
  });
});
