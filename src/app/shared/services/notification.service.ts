import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notification, NotificationType } from '../components/error-notification/error-notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  private notifications: Notification[] = [];

  constructor() {}

  getNotifications(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  getAllNotifications(): Notification[] {
    return this.notifications;
  }

  show(type: NotificationType, message: string, details?: string, autoClose: boolean = true, duration: number = 5000) {
    const notification: Notification = {
      id: this.generateId(),
      type,
      message,
      details,
      autoClose,
      duration
    };

    this.notifications.push(notification);
    this.notificationSubject.next(notification);

    if (autoClose) {
      setTimeout(() => {
        this.remove(notification.id);
      }, duration);
    }
  }

  success(message: string, details?: string) {
    this.show('success', message, details);
  }

  error(message: string, details?: string) {
    this.show('error', message, details, true, 8000);
  }

  warning(message: string, details?: string) {
    this.show('warning', message, details);
  }

  info(message: string, details?: string) {
    this.show('info', message, details);
  }

  remove(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clear() {
    this.notifications = [];
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
