import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from '@belisada-seller/features/profile/profile.module';
import { OrderPrintComponent } from './order-print/order-print.component';
import { InvoiceNumberComponent } from './order-list/invoice/invoice-number/invoice-number.component';
import { IncomeSellerComponent } from './income-seller/income-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatComponent } from './chat/chat.component';
import { MyIncomeComponent } from './income-seller/my-income/my-income.component';
import { IncomeHistoryComponent } from './income-seller/income-history/income-history.component';

@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [OrderPrintComponent, InvoiceNumberComponent, IncomeSellerComponent, MyIncomeComponent, IncomeHistoryComponent]
})
export class FeaturesModule { }
