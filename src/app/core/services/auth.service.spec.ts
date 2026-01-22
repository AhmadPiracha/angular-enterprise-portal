import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current user', () => {
    const user = service.getUser();
    expect(user).toBeTruthy();
    expect(user.name).toBe('Ahmad Piracha');
  });

  it('should return true when user is logged in', () => {
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return false when user is logged out', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should check user role correctly', () => {
    const user = service.getUser();
    if (user) {
      expect(service.hasRole(user.role)).toBe(true);
      expect(service.hasRole(user.role === 'USER' ? 'ADMIN' : 'USER')).toBe(false);
    }
  });

  it('should return null after logout', () => {
    service.logout();
    expect(service.getUser()).toBeNull();
  });

  it('should return false for hasRole after logout', () => {
    service.logout();
    expect(service.hasRole('USER')).toBe(false);
    expect(service.hasRole('ADMIN')).toBe(false);
  });
});
