import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  
  describe('noWhitespace', () => {
    it('should return null for valid input without whitespace', () => {
      const control = new FormControl('validInput');
      const validator = CustomValidators.noWhitespace();
      expect(validator(control)).toBeNull();
    });

    it('should return error for input with whitespace', () => {
      const control = new FormControl('invalid input');
      const validator = CustomValidators.noWhitespace();
      expect(validator(control)).toEqual({ whitespace: true });
    });

    it('should return null for empty value', () => {
      const control = new FormControl('');
      const validator = CustomValidators.noWhitespace();
      expect(validator(control)).toBeNull();
    });
  });

  describe('email', () => {
    it('should return null for valid email', () => {
      const control = new FormControl('test@example.com');
      const validator = CustomValidators.email();
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid email', () => {
      const control = new FormControl('invalid-email');
      const validator = CustomValidators.email();
      expect(validator(control)).toEqual({ email: true });
    });

    it('should return null for empty value', () => {
      const control = new FormControl('');
      const validator = CustomValidators.email();
      expect(validator(control)).toBeNull();
    });
  });

  describe('phoneNumber', () => {
    it('should return null for valid phone number', () => {
      const control = new FormControl('123-456-7890');
      const validator = CustomValidators.phoneNumber();
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid phone number', () => {
      const control = new FormControl('123');
      const validator = CustomValidators.phoneNumber();
      expect(validator(control)).toEqual({ phoneNumber: true });
    });
  });

  describe('strongPassword', () => {
    it('should return null for strong password', () => {
      const control = new FormControl('StrongP@ss1');
      const validator = CustomValidators.strongPassword();
      expect(validator(control)).toBeNull();
    });

    it('should return error for weak password', () => {
      const control = new FormControl('weak');
      const validator = CustomValidators.strongPassword();
      const result = validator(control);
      expect(result).toBeTruthy();
      expect(result.strongPassword).toBeTruthy();
    });

    it('should return error for password without special character', () => {
      const control = new FormControl('StrongPass1');
      const validator = CustomValidators.strongPassword();
      const result = validator(control);
      expect(result.strongPassword.specialChar).toBe(true);
    });
  });

  describe('url', () => {
    it('should return null for valid URL', () => {
      const control = new FormControl('https://example.com');
      const validator = CustomValidators.url();
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid URL', () => {
      const control = new FormControl('not-a-url');
      const validator = CustomValidators.url();
      expect(validator(control)).toEqual({ url: true });
    });
  });

  describe('range', () => {
    it('should return null for value in range', () => {
      const control = new FormControl(5);
      const validator = CustomValidators.range(1, 10);
      expect(validator(control)).toBeNull();
    });

    it('should return error for value out of range', () => {
      const control = new FormControl(15);
      const validator = CustomValidators.range(1, 10);
      expect(validator(control)).toEqual({ range: { min: 1, max: 10, actual: 15 } });
    });
  });

  describe('creditCard', () => {
    it('should return null for valid credit card (test number)', () => {
      const control = new FormControl('4532015112830366');
      const validator = CustomValidators.creditCard();
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid credit card', () => {
      const control = new FormControl('1234567890123456');
      const validator = CustomValidators.creditCard();
      expect(validator(control)).toEqual({ creditCard: true });
    });
  });

  describe('json', () => {
    it('should return null for valid JSON', () => {
      const control = new FormControl('{"key": "value"}');
      const validator = CustomValidators.json();
      expect(validator(control)).toBeNull();
    });

    it('should return error for invalid JSON', () => {
      const control = new FormControl('{invalid json}');
      const validator = CustomValidators.json();
      expect(validator(control)).toEqual({ json: true });
    });
  });
});
