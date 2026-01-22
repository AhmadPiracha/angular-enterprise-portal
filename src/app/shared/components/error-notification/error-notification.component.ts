import { Component, Input, Output, EventEmitter } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  details?: string;
  autoClose?: boolean;
  duration?: number;
}

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent {
  @Input() notification: Notification;
  @Output() close = new EventEmitter<string>();

  ngOnInit() {
    if (this.notification.autoClose !== false) {
      const duration = this.notification.duration || 5000;
      setTimeout(() => {
        this.onClose();
      }, duration);
    }
  }

  onClose() {
    this.close.emit(this.notification.id);
  }

  getIcon(): string {
    switch (this.notification.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  }
}
