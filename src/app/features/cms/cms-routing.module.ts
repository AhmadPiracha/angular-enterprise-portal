import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsHomeComponent } from './cms-home/cms-home.component';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CmsHomeComponent
  },
  {
    path: 'home',
    component: CmsHomeComponent
  },
  {
    path: 'privacy',
    component: CmsPageComponent
  },
  {
    path: 'terms',
    component: CmsPageComponent
  },
  {
    path: 'help',
    component: CmsPageComponent
  },
  {
    path: ':slug',
    component: CmsPageComponent
  }
];

export const cmsRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [cmsRouting],
  exports: [RouterModule]
})
export class CmsRoutingModule {}
