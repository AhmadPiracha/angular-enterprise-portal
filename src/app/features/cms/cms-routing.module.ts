import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CmsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: CmsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: CmsPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule {}
