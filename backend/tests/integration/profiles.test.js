const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/models/User');
const UserProfile = require('../../src/models/UserProfile');

describe('Profile Endpoints', () => {
  let token;
  let userId;

  beforeEach(async () => {
    // Create and login user
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    userId = user._id;

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    token = res.body.data.token;
  });

  describe('POST /api/profiles', () => {
    it('should create a new profile', async () => {
      const res = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send({
          publicUrl: 'test-user',
          title: 'Full Stack Developer',
          bio: 'Passionate about coding',
          links: [
            {
              type: 'linkedin',
              label: 'LinkedIn',
              url: 'https://linkedin.com/in/testuser',
              order: 1
            }
          ]
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.publicUrl).toBe('test-user');
      expect(res.body.data.title).toBe('Full Stack Developer');
    });

    it('should not create duplicate profile for same user', async () => {
      // Create first profile
      await UserProfile.create({
        user: userId,
        publicUrl: 'test-user',
        title: 'Developer'
      });

      // Try to create second profile
      const res = await request(app)
        .post('/api/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send({
          publicUrl: 'test-user-2',
          title: 'Developer'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should not create profile without authentication', async () => {
      const res = await request(app)
        .post('/api/profiles')
        .send({
          publicUrl: 'test-user',
          title: 'Developer'
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/profiles/my-profile', () => {
    it('should get current user profile', async () => {
      // Create profile
      await UserProfile.create({
        user: userId,
        publicUrl: 'test-user',
        title: 'Developer',
        bio: 'Test bio'
      });

      const res = await request(app)
        .get('/api/profiles/my-profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.publicUrl).toBe('test-user');
    });

    it('should return 404 if profile does not exist', async () => {
      const res = await request(app)
        .get('/api/profiles/my-profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/profiles/public/:publicUrl', () => {
    it('should get public profile by URL', async () => {
      // Create profile
      await UserProfile.create({
        user: userId,
        publicUrl: 'john-doe',
        title: 'Developer',
        bio: 'Public bio',
        isPublic: true,
        stats: { views: 0, scans: 0 }
      });

      const res = await request(app)
        .get('/api/profiles/public/john-doe');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.publicUrl).toBe('john-doe');
      expect(res.body.data.stats.views).toBe(1); // View count incremented
    });

    it('should return 404 for non-existent profile', async () => {
      const res = await request(app)
        .get('/api/profiles/public/non-existent');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('should not get private profile', async () => {
      await UserProfile.create({
        user: userId,
        publicUrl: 'private-user',
        title: 'Developer',
        isPublic: false
      });

      const res = await request(app)
        .get('/api/profiles/public/private-user');

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/profiles/:id', () => {
    it('should update own profile', async () => {
      const profile = await UserProfile.create({
        user: userId,
        publicUrl: 'test-user',
        title: 'Developer'
      });

      const res = await request(app)
        .put(`/api/profiles/${profile._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Senior Developer',
          bio: 'Updated bio'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Senior Developer');
      expect(res.body.data.bio).toBe('Updated bio');
    });

    it('should not update another user profile', async () => {
      // Create another user
      const otherUser = await User.create({
        email: 'other@example.com',
        password: 'password123'
      });

      const otherProfile = await UserProfile.create({
        user: otherUser._id,
        publicUrl: 'other-user',
        title: 'Developer'
      });

      const res = await request(app)
        .put(`/api/profiles/${otherProfile._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Hacked'
        });

      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });
});
