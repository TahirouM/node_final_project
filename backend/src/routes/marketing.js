const express = require('express');
const { getAllContent, getSection, upsertSection } = require('../controllers/marketingController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getAllContent);
router.get('/:section', getSection);
router.put('/:section', protect, authorize('admin'), upsertSection);

module.exports = router;
