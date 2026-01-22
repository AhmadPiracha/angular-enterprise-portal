import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ExampleFeaturesComponent } from './example-features.component';
import { SharedModule } from '../../../shared/shared.module';
import { LoggingService } from '../../../core/services/logging.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { reducers } from '../../../store';

describe('ExampleFeaturesComponent', () => {
  let component: ExampleFeaturesComponent;
  let fixture: ComponentFixture<ExampleFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleFeaturesComponent ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        LoggingService,
        NotificationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with validators', () => {
    expect(component.exampleForm).toBeDefined();
    expect(component.exampleForm.get('email')).toBeDefined();
    expect(component.exampleForm.get('password')).toBeDefined();
  });

  it('should show notifications', () => {
    spyOn(component['notificationService'], 'success');
    component.showSuccessNotification();
    expect(component['notificationService'].success).toHaveBeenCalled();
  });

  it('should toggle spinners', () => {
    expect(component.showInlineSpinner).toBe(false);
    component.toggleInlineSpinner();
    expect(component.showInlineSpinner).toBe(true);
  });
});
