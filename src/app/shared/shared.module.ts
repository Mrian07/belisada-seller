import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisPipe } from '@belisada-seller/shared/pipes/ellipsis.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EllipsisPipe
  ],
  exports: [
    EllipsisPipe
  ]
})
export class SharedModule { }
