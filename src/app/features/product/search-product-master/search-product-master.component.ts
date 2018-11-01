import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsSandbox } from '../products.sandbox';
import { ProductSuggestion } from '@belisada-seller/core/models';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'bss-search-product-master',
  templateUrl: './search-product-master.component.html',
  styleUrls: ['./search-product-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchProductMasterComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  productSuggestionList: ProductSuggestion[];
  onProductNameFocus: Boolean = false;
  name: string;
  checkIfLength: Boolean = false;
  addProductForm: FormGroup;
  a;
  b;
  constructor(
    private fb: FormBuilder,
    public productsSandbox: ProductsSandbox,
    private router: Router,
    ) { }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name: [''],
      nameProduk: [''],
    });
    console.log('x');
  }


  searchProductName(e) {
    const queryParams = {
      q: e.target.value
    };
    this.a = e;
    this.productsSandbox.getProductSearch(queryParams);
    if (e.target.value === '') {
      this.checkIfLength = true;
    } else {
      this.checkIfLength = false;
    }
  }
  selectProductName(mProductId, name) {
    this.name = name;
    this.b = mProductId;
    this.productsSandbox.productAdd(mProductId[0]);
    this.router.navigate(['/products/' + mProductId]);

  }
  onProductNameBlur(): void {
    setTimeout(() => { this.onProductNameFocus = false; }, 200);
  }
  test () {
    this.productsSandbox.reqProduct(this.addProductForm.value);
  }
  ngOnDestroy() {
    console.log('123');
    // console.log('this.a:', this.a);
    this.productsSandbox.getProductSearch(this.a);
    this.productsSandbox.productAdd(this.b);
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }
}
