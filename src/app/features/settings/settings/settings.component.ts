import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User | null = null;
  activeTab: 'profile' | 'security' | 'notifications' | 'preferences' = 'profile';
  
  profileForm: FormGroup;
  passwordForm: FormGroup;
  notificationSettings = {
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    productUpdates: false
  };
  
  preferences = {
    theme: 'light',
    language: 'en',
    timezone: 'UTC'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      bio: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) {
      this.profileForm.patchValue({
        name: this.user.name || ''
      });
    }
  }

  setActiveTab(tab: 'profile' | 'security' | 'notifications' | 'preferences') {
    this.activeTab = tab;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      // In a real app, you would call an API here
      this.notificationService.success('Profile updated successfully');
    } else {
      this.notificationService.error('Please fill in all required fields correctly');
    }
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      
      if (newPassword !== confirmPassword) {
        this.notificationService.error('Passwords do not match');
        return;
      }

      // In a real app, you would call an API here
      this.notificationService.success('Password changed successfully');
      this.passwordForm.reset();
    } else {
      this.notificationService.error('Please fill in all required fields correctly');
    }
  }

  saveNotificationSettings() {
    // In a real app, you would call an API here
    this.notificationService.success('Notification settings saved');
  }

  savePreferences() {
    // In a real app, you would call an API here
    this.notificationService.success('Preferences saved');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, you would call an API here
      this.notificationService.info('Account deletion requested');
    }
  }
}
