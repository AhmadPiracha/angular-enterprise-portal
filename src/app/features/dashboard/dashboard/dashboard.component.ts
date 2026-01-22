import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('/dashboard/summary').subscribe(res => {
      this.data = res;
    }, error => {
      // If API call fails, just continue - dashboard will show static content
      console.log('API not available, showing default dashboard');
    });
  }
}
