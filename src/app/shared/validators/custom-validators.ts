import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom form validators for enterprise applications
 */
export class CustomValidators {

  /**
   * Validates that a string contains no whitespace
   */
  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const hasWhitespace = /\s/.test(control.value);
      return hasWhitespace ? { whitespace: true } : null;
    };
  }

  /**
   * Validates email format with stricter rules
   */
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { email: true };
    };
  }

  /**
   * Validates phone number (US format)
   */
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      const valid = phoneRegex.test(control.value.replace(/\s/g, ''));
      return valid ? null : { phoneNumber: true };
    };
  }

  /**
   * Validates strong password requirements
   * - At least 8 characters
   * - Contains uppercase letter
   * - Contains lowercase letter
   * - Contains number
   * - Contains special character
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const password = control.value;
      const errors: any = {};

      if (password.length < 8) {
        errors.minLength = true;
      }
      if (!/[A-Z]/.test(password)) {
        errors.uppercase = true;
      }
      if (!/[a-z]/.test(password)) {
        errors.lowercase = true;
      }
      if (!/[0-9]/.test(password)) {
        errors.number = true;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.specialChar = true;
      }

      return Object.keys(errors).length > 0 ? { strongPassword: errors } : null;
    };
  }

  /**
   * Validates that the value matches another control's value
   */
  static matchControl(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const controlToMatch = control.parent.get(controlName);
      if (!controlToMatch) {
        return null;
      }

      if (control.value !== controlToMatch.value) {
        return { matchControl: { controlName } };
      }

      return null;
    };
  }

  /**
   * Validates URL format
   */
  static url(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      try {
        new URL(control.value);
        return null;
      } catch {
        return { url: true };
      }
    };
  }

  /**
   * Validates minimum age
   */
  static minAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  /**
   * Validates that value is in a specific range
   */
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value && control.value !== 0) {
        return null;
      }

      const value = parseFloat(control.value);
      if (isNaN(value)) {
        return { range: { min, max, actual: control.value } };
      }

      if (value < min || value > max) {
        return { range: { min, max, actual: value } };
      }

      return null;
    };
  }

  /**
   * Validates credit card number using Luhn algorithm
   */
  static creditCard(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.replace(/\s/g, '');
      
      if (!/^\d+$/.test(value)) {
        return { creditCard: true };
      }

      // Luhn algorithm
      let sum = 0;
      let isEven = false;

      for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value.charAt(i), 10);

        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
        isEven = !isEven;
      }

      return (sum % 10) === 0 ? null : { creditCard: true };
    };
  }

  /**
   * Validates JSON format
   */
  static json(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      try {
        JSON.parse(control.value);
        return null;
      } catch {
        return { json: true };
      }
    };
  }

  /**
   * Validates that at least one checkbox in a group is checked
   */
  static requiredCheckboxGroup(minRequired: number = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { requiredCheckboxGroup: { minRequired } };
      }

      const checkedCount = Object.values(control.value).filter(v => v === true).length;
      
      return checkedCount >= minRequired ? null : { requiredCheckboxGroup: { minRequired, actual: checkedCount } };
    };
  }
}
