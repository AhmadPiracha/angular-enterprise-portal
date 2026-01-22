import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {
  @Input() control: AbstractControl;
  @Input() fieldName: string = 'This field';

  get errorMessage(): string {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return '';
    }

    const errors = this.control.errors;

    // Built-in validators
    if (errors.required) {
      return `${this.fieldName} is required`;
    }
    if (errors.minlength) {
      return `${this.fieldName} must be at least ${errors.minlength.requiredLength} characters`;
    }
    if (errors.maxlength) {
      return `${this.fieldName} must not exceed ${errors.maxlength.requiredLength} characters`;
    }
    if (errors.min) {
      return `${this.fieldName} must be at least ${errors.min.min}`;
    }
    if (errors.max) {
      return `${this.fieldName} must not exceed ${errors.max.max}`;
    }
    if (errors.pattern) {
      return `${this.fieldName} format is invalid`;
    }

    // Custom validators
    if (errors.email) {
      return `${this.fieldName} must be a valid email address`;
    }
    if (errors.whitespace) {
      return `${this.fieldName} cannot contain whitespace`;
    }
    if (errors.phoneNumber) {
      return `${this.fieldName} must be a valid phone number`;
    }
    if (errors.url) {
      return `${this.fieldName} must be a valid URL`;
    }
    if (errors.creditCard) {
      return `${this.fieldName} must be a valid credit card number`;
    }
    if (errors.json) {
      return `${this.fieldName} must be valid JSON`;
    }
    if (errors.strongPassword) {
      const pwdErrors = [];
      if (errors.strongPassword.minLength) pwdErrors.push('at least 8 characters');
      if (errors.strongPassword.uppercase) pwdErrors.push('an uppercase letter');
      if (errors.strongPassword.lowercase) pwdErrors.push('a lowercase letter');
      if (errors.strongPassword.number) pwdErrors.push('a number');
      if (errors.strongPassword.specialChar) pwdErrors.push('a special character');
      return `Password must contain ${pwdErrors.join(', ')}`;
    }
    if (errors.matchControl) {
      return `${this.fieldName} must match ${errors.matchControl.controlName}`;
    }
    if (errors.range) {
      return `${this.fieldName} must be between ${errors.range.min} and ${errors.range.max}`;
    }
    if (errors.minAge) {
      return `Must be at least ${errors.minAge.requiredAge} years old`;
    }
    if (errors.requiredCheckboxGroup) {
      return `Please select at least ${errors.requiredCheckboxGroup.minRequired} option(s)`;
    }

    return `${this.fieldName} is invalid`;
  }

  get showError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }
}
