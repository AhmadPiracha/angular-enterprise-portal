import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default loading message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-message').textContent).toContain('Loading...');
  });

  it('should display custom message when provided', () => {
    component.message = 'Please wait...';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-message').textContent).toContain('Please wait...');
  });

  it('should apply overlay class when overlay is true', () => {
    component.overlay = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-spinner').classList.contains('overlay')).toBe(true);
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.spinner-large')).toBeTruthy();
  });
});
