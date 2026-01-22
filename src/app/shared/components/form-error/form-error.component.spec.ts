import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('', Validators.required);
    component.fieldName = 'Test Field';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show error when control is not touched', () => {
    expect(component.showError).toBe(false);
  });

  it('should show error when control is touched and invalid', () => {
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.showError).toBe(true);
  });

  it('should display required error message', () => {
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Test Field is required');
  });

  it('should display minlength error message', () => {
    component.control = new FormControl('ab', [Validators.minLength(5)]);
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Test Field must be at least 5 characters');
  });

  it('should display maxlength error message', () => {
    component.control = new FormControl('abcdefghijk', [Validators.maxLength(5)]);
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Test Field must not exceed 5 characters');
  });

  it('should display email error message', () => {
    component.control = new FormControl('invalid', [Validators.email]);
    component.control.markAsTouched();
    fixture.detectChanges();
    expect(component.errorMessage).toContain('email');
  });

  it('should not render error element when not showing error', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.form-error')).toBeNull();
  });

  it('should render error element when showing error', () => {
    component.control.markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.form-error')).toBeTruthy();
  });
});
