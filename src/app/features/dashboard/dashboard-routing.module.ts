import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  }
];

export const dashboardRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [dashboardRouting],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}