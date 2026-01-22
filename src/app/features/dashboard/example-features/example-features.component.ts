import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { selectUser, selectAuthLoading } from '../../../store/auth/auth.selectors';
import { selectLoading } from '../../../store/ui/ui.selectors';
import { LoggingService } from '../../../core/services/logging.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-example-features',
  templateUrl: './example-features.component.html',
  styleUrls: ['./example-features.component.scss']
})
export class ExampleFeaturesComponent implements OnInit {
  // NgRx Store Observables
  user$ = this.store.select(selectUser);
  loading$ = this.store.select(selectLoading);
  authLoading$ = this.store.select(selectAuthLoading);

  // Loading spinner controls
  showInlineSpinner = false;
  showOverlaySpinner = false;

  // Form with custom validators
  exampleForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      CustomValidators.email()
    ]),
    password: new FormControl('', [
      Validators.required, 
      CustomValidators.strongPassword()
    ]),
    phone: new FormControl('', [
      CustomValidators.phoneNumber()
    ]),
    website: new FormControl('', [
      CustomValidators.url()
    ]),
    age: new FormControl('', [
      Validators.required,
      CustomValidators.range(18, 120)
    ]),
    username: new FormControl('', [
      Validators.required,
      CustomValidators.noWhitespace()
    ])
  });

  constructor(
    private store: Store<AppState>,
    private logger: LoggingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // Log component initialization
    this.logger.info('ExampleFeaturesComponent initialized');
    this.logger.trackPageView('Example Features Page');

    // Track custom event
    this.logger.trackEvent('ExamplePageVisited', {
      timestamp: new Date().toISOString()
    });
  }

  // Notification examples
  showSuccessNotification() {
    this.notificationService.success('Success!', 'This is a success notification');
    this.logger.trackEvent('NotificationShown', { type: 'success' });
  }

  showErrorNotification() {
    this.notificationService.error('Error!', 'This is an error notification');
    this.logger.trackEvent('NotificationShown', { type: 'error' });
  }

  showWarningNotification() {
    this.notificationService.warning('Warning!', 'This is a warning notification');
    this.logger.trackEvent('NotificationShown', { type: 'warning' });
  }

  showInfoNotification() {
    this.notificationService.info('Info!', 'This is an info notification');
    this.logger.trackEvent('NotificationShown', { type: 'info' });
  }

  // Loading spinner examples
  toggleInlineSpinner() {
    this.showInlineSpinner = !this.showInlineSpinner;
    this.logger.debug('Inline spinner toggled', { visible: this.showInlineSpinner });
  }

  toggleOverlaySpinner() {
    this.showOverlaySpinner = !this.showOverlaySpinner;
    this.logger.debug('Overlay spinner toggled', { visible: this.showOverlaySpinner });
  }

  simulateAsyncOperation() {
    this.showOverlaySpinner = true;
    this.logger.info('Starting async operation');

    setTimeout(() => {
      this.showOverlaySpinner = false;
      this.notificationService.success('Operation completed!');
      this.logger.info('Async operation completed');
      this.logger.trackMetric('AsyncOperationDuration', 3000);
    }, 3000);
  }

  // Form submission
  onSubmit() {
    if (this.exampleForm.valid) {
      this.logger.info('Form submitted', this.exampleForm.value);
      this.logger.trackEvent('FormSubmitted', {
        formName: 'exampleForm',
        fields: Object.keys(this.exampleForm.value)
      });
      this.notificationService.success('Form submitted successfully!');
    } else {
      this.logger.warning('Form submission attempted with invalid data');
      this.notificationService.error('Please fix form errors before submitting');
    }
  }

  // Logging examples
  logTrace() {
    this.logger.trace('This is a trace log', { detail: 'trace data' });
    this.notificationService.info('Trace log sent (check console)');
  }

  logDebug() {
    this.logger.debug('This is a debug log', { detail: 'debug data' });
    this.notificationService.info('Debug log sent (check console)');
  }

  logInfo() {
    this.logger.info('This is an info log', { detail: 'info data' });
    this.notificationService.info('Info log sent (check console)');
  }

  logWarning() {
    this.logger.warning('This is a warning log', { detail: 'warning data' });
    this.notificationService.info('Warning log sent (check console)');
  }

  logError() {
    try {
      throw new Error('Example error');
    } catch (error) {
      this.logger.error('This is an error log', error);
      this.notificationService.info('Error log sent (check console)');
    }
  }

  trackCustomEvent() {
    this.logger.trackEvent('CustomButtonClicked', {
      buttonId: 'trackEventButton',
      page: 'example-features'
    });
    this.notificationService.info('Custom event tracked');
  }

  trackMetric() {
    const randomValue = Math.floor(Math.random() * 1000);
    this.logger.trackMetric('CustomMetric', randomValue, {
      unit: 'ms',
      context: 'example'
    });
    this.notificationService.info(`Metric tracked: ${randomValue}ms`);
  }
}
