const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

/**
 * @desc    Get public profile by publicUrl
 * @route   GET /api/profiles/public/:publicUrl
 * @access  Public
 */
exports.getPublicProfile = async (req, res, next) => {
  try {
    const { publicUrl } = req.params;

    const profile = await UserProfile.findOne({ publicUrl, isPublic: true })
      .populate('user', 'firstName lastName email')
      .populate('bracelet', 'nfcId');

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    // Increment view count
    profile.stats.views += 1;
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user's profile
 * @route   GET /api/profiles/my-profile
 * @access  Private
 */
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id })
      .populate('user', 'firstName lastName email')
      .populate('bracelet', 'nfcId isActive');

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found. Please create a profile first.'
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create user profile
 * @route   POST /api/profiles
 * @access  Private
 */
exports.createProfile = async (req, res, next) => {
  try {
    // Check if profile already exists
    const existingProfile = await UserProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        error: 'Profile already exists for this user'
      });
    }

    // Create profile
    const profile = await UserProfile.create({
      ...req.body,
      user: req.user.id
    });

    await profile.populate('user', 'firstName lastName email');

    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/profiles/:id
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await UserProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    // Make sure user owns the profile
    if (profile.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    profile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('user', 'firstName lastName email');

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Increment scan count for profile
 * @route   POST /api/profiles/:id/scan
 * @access  Public
 */
exports.incrementScan = async (req, res, next) => {
  try {
    const profile = await UserProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    profile.stats.scans += 1;
    await profile.save();

    res.status(200).json({
      success: true,
      data: { scans: profile.stats.scans }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user profile
 * @route   DELETE /api/profiles/:id
 * @access  Private
 */
exports.deleteProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }

    // Make sure user owns the profile
    if (profile.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this profile'
      });
    }

    await profile.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
