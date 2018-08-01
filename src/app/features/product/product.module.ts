import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingProductComponent } from './listing-product/listing-product.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { FieldComponent } from './add-product/field/field.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListingProductComponent, FieldErrorComponent, FieldComponent]
})
export class ProductModule { }
