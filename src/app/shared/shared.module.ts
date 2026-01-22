import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    ErrorNotificationComponent,
    FormErrorComponent,
    NotificationContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UnauthorizedComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    ErrorNotificationComponent,
    FormErrorComponent,
    NotificationContainerComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {}
