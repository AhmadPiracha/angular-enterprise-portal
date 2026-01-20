import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component'
import { AuthGuard } from './core/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile.module').then(
        m => m.ProfileModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./features/cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [appRouting],
  exports: [RouterModule]
})
export class AppRoutingModule {}
