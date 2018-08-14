import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@belisada-seller/features/profile/profile.module';
import { OrderPrintComponent } from './order-print/order-print.component';
import { InvoiceNumberComponent } from './order-list/invoice/invoice-number/invoice-number.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderPrintComponent, InvoiceNumberComponent]
})
export class FeaturesModule { }
