const express = require('express');
const {
  activateBracelet,
  getMyBracelets,
  getBracelet,
  deactivateBracelet,
  getByNfcId
} = require('../controllers/braceletController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Public route — must be declared before protect middleware
router.get('/by-nfc/:nfcId', getByNfcId);

// Protected routes
router.use(protect);
router.post('/activate', activateBracelet);
router.get('/my-bracelets', getMyBracelets);
router.get('/:id', getBracelet);
router.delete('/:id/deactivate', deactivateBracelet);

module.exports = router;
