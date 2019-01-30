import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@belisada-seller/shared/shared.module';
import { ProductsSandbox } from './products.sandbox';
import { SearchProductMasterComponent } from './search-product-master/search-product-master.component';
import { AddProductV2Component } from './add-product-v2/add-product-v2.component';
import { ProductsResolver } from './product.resolver';
import { ListingProductManageComponent } from './listing-product-manage/listing-product-manage.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ListingProductManageComponent],
  providers: [
    ProductsSandbox,
    ProductsResolver
  ]
})
export class ProductModule { }
