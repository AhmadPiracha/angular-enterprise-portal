import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success notification', (done) => {
    service.getNotifications().subscribe(notification => {
      expect(notification.type).toBe('success');
      expect(notification.message).toBe('Success message');
      done();
    });

    service.success('Success message');
  });

  it('should show error notification', (done) => {
    service.getNotifications().subscribe(notification => {
      expect(notification.type).toBe('error');
      expect(notification.message).toBe('Error message');
      done();
    });

    service.error('Error message');
  });

  it('should show warning notification', (done) => {
    service.getNotifications().subscribe(notification => {
      expect(notification.type).toBe('warning');
      expect(notification.message).toBe('Warning message');
      done();
    });

    service.warning('Warning message');
  });

  it('should show info notification', (done) => {
    service.getNotifications().subscribe(notification => {
      expect(notification.type).toBe('info');
      expect(notification.message).toBe('Info message');
      done();
    });

    service.info('Info message');
  });

  it('should add notification to the list', () => {
    service.success('Test');
    expect(service.getAllNotifications().length).toBe(1);
  });

  it('should remove notification by id', () => {
    service.success('Test');
    const notifications = service.getAllNotifications();
    const id = notifications[0].id;
    
    service.remove(id);
    expect(service.getAllNotifications().length).toBe(0);
  });

  it('should clear all notifications', () => {
    service.success('Test 1');
    service.error('Test 2');
    service.warning('Test 3');
    
    expect(service.getAllNotifications().length).toBe(3);
    
    service.clear();
    expect(service.getAllNotifications().length).toBe(0);
  });
});
