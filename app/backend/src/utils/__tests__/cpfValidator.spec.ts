import { sanitizeCPF, isValidCPF } from '../cpfValidator';

describe('CPF Validator Utils', () => {
  describe('sanitizeCPF', () => {
    it('should remove all non-numeric characters', () => {
      expect(sanitizeCPF('123.456.789-00')).toBe('12345678900');
      expect(sanitizeCPF('abc123def456')).toBe('123456');
      expect(sanitizeCPF('!@#123$%^456&*()')).toBe('123456');
    });

    it('should return empty string if no numbers are present', () => {
      expect(sanitizeCPF('abcdef')).toBe('');
      expect(sanitizeCPF('!@#$%')).toBe('');
    });
  });

  describe('isValidCPF', () => {
    it('should return true for valid CPFs (sanitized or formatted)', () => {
      expect(isValidCPF('52886531863')).toBe(true);
      expect(isValidCPF('30283822538')).toBe(true);
      expect(isValidCPF('426.755.574-55')).toBe(true);
      expect(isValidCPF('01000000290')).toBe(true);
    });

    it('should return false for invalid CPFs', () => {
      expect(isValidCPF('11111111111')).toBe(false); // all same digits
      expect(isValidCPF('12345678901')).toBe(false); // invalid check digits (second digit invalid)
      expect(isValidCPF('52886531803')).toBe(false); // invalid first check digit (6 changed to 0)
      expect(isValidCPF('52886531864')).toBe(false); // wrong check digit
    });

    it('should return false for documents with invalid lengths', () => {
      expect(isValidCPF('123')).toBe(false);
      expect(isValidCPF('1234567890')).toBe(false); // 10 digits
      expect(isValidCPF('123456789012')).toBe(false); // 12 digits
      expect(isValidCPF('')).toBe(false);
    });
  });
});
