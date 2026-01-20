import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CmsRoutingModule } from './cms-routing.module';
import { CmsPageComponent } from './cms-page/cms-page.component';
import { CmsHomeComponent } from './cms-home/cms-home.component';


@NgModule({
  declarations: [
    CmsHomeComponent,
    CmsPageComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule
  ],
  exports: [
    CmsHomeComponent,
    CmsPageComponent
  ]
})
export class CmsModule {}

