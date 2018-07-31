import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@belisada-seller/features/profile/profile.module';
import { OrderPrintComponent } from './order-print/order-print.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderPrintComponent]
})
export class FeaturesModule { }
