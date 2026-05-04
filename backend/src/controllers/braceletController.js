const NfcBracelet = require('../models/NfcBracelet');
const UserProfile = require('../models/UserProfile');
const { validateNfcId } = require('../services/nfcService');

/**
 * @desc    Activate a new bracelet
 * @route   POST /api/bracelets/activate
 * @access  Private
 */
exports.activateBracelet = async (req, res, next) => {
  try {
    const { nfcId } = req.body;

    if (!nfcId) {
      return res.status(400).json({
        success: false,
        error: 'NFC ID is required'
      });
    }

    // Validate NFC ID format
    if (!validateNfcId(nfcId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid NFC ID format. Expected format: NFC-XXXXXXXX'
      });
    }

    // Check if NFC ID already exists
    const existingBracelet = await NfcBracelet.findOne({ nfcId });
    if (existingBracelet) {
      return res.status(400).json({
        success: false,
        error: 'This NFC bracelet has already been activated'
      });
    }

    // Create bracelet
    const bracelet = await NfcBracelet.create({
      user: req.user.id,
      nfcId: nfcId.toUpperCase()
    });

    // Update user profile if exists
    const profile = await UserProfile.findOne({ user: req.user.id });
    if (profile && !profile.bracelet) {
      profile.bracelet = bracelet._id;
      await profile.save();
    }

    res.status(201).json({
      success: true,
      data: bracelet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user's bracelets
 * @route   GET /api/bracelets/my-bracelets
 * @access  Private
 */
exports.getMyBracelets = async (req, res, next) => {
  try {
    const bracelets = await NfcBracelet.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bracelets.length,
      data: bracelets
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single bracelet
 * @route   GET /api/bracelets/:id
 * @access  Private
 */
exports.getBracelet = async (req, res, next) => {
  try {
    const bracelet = await NfcBracelet.findById(req.params.id);

    if (!bracelet) {
      return res.status(404).json({
        success: false,
        error: 'Bracelet not found'
      });
    }

    // Make sure user owns the bracelet
    if (bracelet.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this bracelet'
      });
    }

    res.status(200).json({
      success: true,
      data: bracelet
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get profile associated to a NFC ID (public — used by NFC scan page)
 * @route   GET /api/bracelets/by-nfc/:nfcId
 * @access  Public
 */
exports.getByNfcId = async (req, res, next) => {
  try {
    const UserProfile = require('../models/UserProfile');
    const bracelet = await NfcBracelet.findOne({
      nfcId: req.params.nfcId.toUpperCase(),
      isActive: true
    });

    if (!bracelet) {
      return res.status(404).json({ success: false, error: 'Bracelet not found or inactive' });
    }

    const profile = await UserProfile.findOne({ user: bracelet.user, isPublic: true })
      .populate('user', 'firstName lastName');

    if (!profile) {
      return res.status(404).json({ success: false, error: 'No public profile linked to this bracelet' });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Deactivate bracelet
 * @route   DELETE /api/bracelets/:id/deactivate
 * @access  Private
 */
exports.deactivateBracelet = async (req, res, next) => {
  try {
    const bracelet = await NfcBracelet.findById(req.params.id);

    if (!bracelet) {
      return res.status(404).json({
        success: false,
        error: 'Bracelet not found'
      });
    }

    // Make sure user owns the bracelet
    if (bracelet.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to deactivate this bracelet'
      });
    }

    bracelet.isActive = false;
    await bracelet.save();

    res.status(200).json({
      success: true,
      data: bracelet
    });
  } catch (error) {
    next(error);
  }
};
