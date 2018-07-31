import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@belisada-seller/features/profile/profile.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderListComponent, OrderComponent]
})
export class FeaturesModule { }
