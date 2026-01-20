import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService, User } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User | null = null;
  isLoading = false;
  updateSuccess = false;
  updateError = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      department: [''],
      location: ['']
    });
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    
    // Try to load profile from API
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.api.get<any>('/users/me').subscribe(
      res => {
        this.profileForm.patchValue({
          name: res.name || (this.user ? this.user.name : '') || '',
          email: res.email || '',
          phone: res.phone || '',
          department: res.department || '',
          location: res.location || ''
        });
        this.isLoading = false;
      },
      error => {
        // If API is not available, use mock data
        this.profileForm.patchValue({
          name: this.user ? this.user.name : 'Ahmad Piracha',
          email: 'ahmad.piracha@zones.com',
          phone: '+1 (555) 123-4567',
          department: 'Digital Transformation',
          location: 'Islamabad, Pakistan'
        });
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.updateSuccess = false;
    this.updateError = '';

    this.api.post('/users/update', this.profileForm.value).subscribe(
      res => {
        this.isLoading = false;
        this.updateSuccess = true;
        setTimeout(() => this.updateSuccess = false, 3000);
      },
      error => {
        this.isLoading = false;
        this.updateError = 'Failed to update profile. Please try again.';
        setTimeout(() => this.updateError = '', 3000);
      }
    );
  }
}
