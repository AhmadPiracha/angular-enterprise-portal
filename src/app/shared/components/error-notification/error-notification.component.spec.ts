import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorNotificationComponent, Notification } from './error-notification.component';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;

  const mockNotification: Notification = {
    id: '1',
    type: 'error',
    message: 'Test error message',
    details: 'Additional details',
    autoClose: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    component.notification = mockNotification;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notification message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notification-message').textContent).toContain('Test error message');
  });

  it('should display notification details when provided', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notification-details').textContent).toContain('Additional details');
  });

  it('should apply correct CSS class based on type', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.notification-error')).toBeTruthy();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    const closeButton = fixture.nativeElement.querySelector('.notification-close');
    closeButton.click();
    expect(component.close.emit).toHaveBeenCalledWith('1');
  });

  it('should return correct icon for each notification type', () => {
    expect(component.getIcon()).toBe('✕');
    
    component.notification.type = 'success';
    expect(component.getIcon()).toBe('✓');
    
    component.notification.type = 'warning';
    expect(component.getIcon()).toBe('⚠');
    
    component.notification.type = 'info';
    expect(component.getIcon()).toBe('ℹ');
  });
});
