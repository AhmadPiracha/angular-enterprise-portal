import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationService } from '../../services/notification.service';
import { ErrorNotificationComponent } from '../error-notification/error-notification.component';

describe('NotificationContainerComponent', () => {
  let component: NotificationContainerComponent;
  let fixture: ComponentFixture<NotificationContainerComponent>;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NotificationContainerComponent,
        ErrorNotificationComponent 
      ],
      providers: [ NotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationContainerComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to notifications on init', () => {
    expect(component.notifications).toBeDefined();
  });

  it('should add notification when service emits', () => {
    notificationService.success('Test message');
    expect(component.notifications.length).toBeGreaterThan(0);
  });

  it('should remove notification when close is called', () => {
    notificationService.success('Test message');
    const notification = component.notifications[0];
    component.onClose(notification.id);
    expect(component.notifications.length).toBe(0);
  });
});
