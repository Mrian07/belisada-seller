import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisPipe } from '@belisada-seller/shared/pipes/ellipsis.pipe';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClickOutsideDirective,
    EllipsisPipe
  ],
  exports: [
    ClickOutsideDirective,
    EllipsisPipe
  ]
})
export class SharedModule { }
