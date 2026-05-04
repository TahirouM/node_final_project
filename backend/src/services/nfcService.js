/**
 * Generate a random NFC ID (simulation)
 * Format: NFC-XXXXXXXX (8 alphanumeric characters)
 */
exports.generateNfcId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nfcId = 'NFC-';

  for (let i = 0; i < 8; i++) {
    nfcId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return nfcId;
};

/**
 * Validate NFC ID format
 */
exports.validateNfcId = (nfcId) => {
  const pattern = /^NFC-[A-Z0-9]{8}$/;
  return pattern.test(nfcId);
};
