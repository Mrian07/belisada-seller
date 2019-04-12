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
import { ThemesModule } from '@belisada-seller/themes/themes.module';
import { ProductAssistComponent } from './product-assist/product-assist.component';
import { HelpListComponent } from './product-assist/help-list/help-list.component';
import { HelpHistoryComponent } from './product-assist/help-history/help-history.component';
import { HelpDetailComponent } from './product-assist/help-detail/help-detail.component';


@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ThemesModule
  ],
  declarations: [
    OrderPrintComponent,
    InvoiceNumberComponent,
    IncomeSellerComponent,
    MyIncomeComponent,
    IncomeHistoryComponent,
    ProductAssistComponent,
    HelpListComponent,
    HelpHistoryComponent,
    HelpDetailComponent
  ]
})
export class FeaturesModule { }
