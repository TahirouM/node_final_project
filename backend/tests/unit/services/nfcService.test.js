const { generateNfcId, validateNfcId } = require('../../../src/services/nfcService');

describe('NFC Service', () => {
  describe('generateNfcId', () => {
    it('should generate an ID with correct format', () => {
      const id = generateNfcId();
      expect(id).toMatch(/^NFC-[A-Z0-9]{8}$/);
    });

    it('should generate unique IDs', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateNfcId()));
      expect(ids.size).toBeGreaterThan(95);
    });

    it('should always produce a 12-character string', () => {
      for (let i = 0; i < 20; i++) {
        expect(generateNfcId()).toHaveLength(12);
      }
    });
  });

  describe('validateNfcId', () => {
    it('should validate a correct NFC ID', () => {
      expect(validateNfcId('NFC-A1B2C3D4')).toBe(true);
    });

    it('should reject an ID without the NFC- prefix', () => {
      expect(validateNfcId('A1B2C3D4')).toBe(false);
    });

    it('should reject lowercase characters in the suffix', () => {
      expect(validateNfcId('NFC-a1b2c3d4')).toBe(false);
    });

    it('should reject an ID that is too short', () => {
      expect(validateNfcId('NFC-A1B2')).toBe(false);
    });

    it('should reject an ID that is too long', () => {
      expect(validateNfcId('NFC-A1B2C3D4EF')).toBe(false);
    });

    it('should reject an empty string', () => {
      expect(validateNfcId('')).toBe(false);
    });

    it('should reject special characters in suffix', () => {
      expect(validateNfcId('NFC-!@#$%^&*')).toBe(false);
    });
  });
});
