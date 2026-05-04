const MarketingContent = require('../models/MarketingContent');

exports.getAllContent = async (req, res, next) => {
  try {
    const content = await MarketingContent.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

exports.getSection = async (req, res, next) => {
  try {
    const content = await MarketingContent.findOne({
      section: req.params.section,
      isActive: true
    });

    if (!content) {
      return res.status(404).json({ success: false, error: 'Section not found' });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};

exports.upsertSection = async (req, res, next) => {
  try {
    const content = await MarketingContent.findOneAndUpdate(
      { section: req.params.section },
      { ...req.body, section: req.params.section },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    next(error);
  }
};
