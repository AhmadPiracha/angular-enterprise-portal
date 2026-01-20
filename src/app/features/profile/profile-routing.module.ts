import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent }
];

export const profileRouting = RouterModule.forChild(routes);

@NgModule({
  imports: [profileRouting],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
