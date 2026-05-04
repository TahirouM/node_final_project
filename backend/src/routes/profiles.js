const express = require('express');
const {
  getPublicProfile,
  getMyProfile,
  createProfile,
  updateProfile,
  incrementScan,
  deleteProfile
} = require('../controllers/profileController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/public/:publicUrl', getPublicProfile);
router.post('/:id/scan', incrementScan);

// Protected routes
router.get('/my-profile', protect, getMyProfile);
router.post('/', protect, createProfile);
router.put('/:id', protect, updateProfile);
router.delete('/:id', protect, deleteProfile);

module.exports = router;
