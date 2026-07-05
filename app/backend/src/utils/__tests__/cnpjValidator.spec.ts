import { sanitizeCNPJ, isValidCNPJ } from '../cnpjValidator';

describe('CNPJ Validator Utils', () => {
  describe('sanitizeCNPJ', () => {
    it('should remove all non-numeric characters', () => {
      expect(sanitizeCNPJ('12.345.678/0001-90')).toBe('12345678000190');
      expect(sanitizeCNPJ('abc123def456')).toBe('123456');
      expect(sanitizeCNPJ('!@#123$%^456&*()')).toBe('123456');
    });

    it('should return empty string if no numbers are present', () => {
      expect(sanitizeCNPJ('abcdef')).toBe('');
      expect(sanitizeCNPJ('!@#$%')).toBe('');
    });
  });

  describe('isValidCNPJ', () => {
    it('should return true for valid CNPJs (sanitized or formatted)', () => {
      expect(isValidCNPJ('00000000000191')).toBe(true);
      expect(isValidCNPJ('33683111000107')).toBe(true);
      expect(isValidCNPJ('33.683.111/0001-07')).toBe(true);
    });

    it('should return false for invalid CNPJs', () => {
      expect(isValidCNPJ('11111111111111')).toBe(false); // all same digits
      expect(isValidCNPJ('12345678901234')).toBe(false); // invalid check digits
      expect(isValidCNPJ('00000000000101')).toBe(false); // invalid first check digit (9 changed to 0)
      expect(isValidCNPJ('00000000000192')).toBe(false); // wrong check digit
    });

    it('should return false for documents with invalid lengths', () => {
      expect(isValidCNPJ('123')).toBe(false);
      expect(isValidCNPJ('1234567890')).toBe(false); // 10 digits
      expect(isValidCNPJ('123456789012345')).toBe(false); // 15 digits
      expect(isValidCNPJ('')).toBe(false);
    });

    it('should reject alphanumeric CNPJs supported by the external library', () => {
      expect(isValidCNPJ('12.ABC.345/01DE-35')).toBe(false);
    });
  });
});
