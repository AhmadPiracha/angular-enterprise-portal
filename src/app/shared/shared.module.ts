import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UnauthorizedComponent,
    HeaderComponent
  ]
})
export class SharedModule {}
