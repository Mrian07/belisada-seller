import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsSandbox } from '../products.sandbox';
import { Subscription } from 'rxjs';
import { AddProductRequest, Reference, VariantAttr, Variant, ProductCreate, ProductDetailData } from '@belisada-seller/core/models';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';

import { environment } from '@env/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '@belisada-seller/core/services';
import swal from 'sweetalert2';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

function compareTwoPrices(c: AbstractControl) {
  if (c.get('specialPrice').value === '' || c.get('pricelist').value === '') {
    return null;
  }

  return +c.get('specialPrice').value >= +c.get('pricelist').value ?
  { 'invalidprice': true } : null;
}
@Component({
  selector: 'bss-add-product-v2',
  templateUrl: './add-product-v2.component.html',
  styleUrls: ['./add-product-v2.component.scss']
})
export class AddProductV2Component implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public product:        ProductDetailData = new ProductDetailData();
  public productV2:        AddProductRequest[];
  public productEdit:        AddProductRequest;
  public warr: Reference[];
  warrLong: Reference[];
  VariantAttr: any[];
  getDataProdV2: AddProductRequest;
  isDiscountActive: Boolean = false;
  totalDiscount: number;
  value = '';
  addProductForm: FormGroup;
  productStoreUrl;
  productImage;
  isFlase: Boolean = false;
  errMaxDiscount: Boolean = false;
  masterId: number;
  couuer: any [];
  masterVariantId: any;
  routeUrl: any;
  productId: number;
  dataVarianEdit: any;
  public daddyPrice: number;
  public dadySpecialPrice: number;
  public dadyStock: number;
  submitted: Boolean = false;
  showRequestVarian: boolean;
  num: number;

  public displayImage: string;

  constructor(
    public productsSandbox: ProductsSandbox,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.productStoreUrl = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
    this.productImage = environment.thumborUrl + 'unsafe/fit-in/400x400/center/filters:fill(fff)/';
    this.productId = this.activatedRoute.snapshot.params.id;
  }
  get f() { return this.addProductForm.controls; }

  ngOnInit() {
    this._getWaranty();
    this.addProductForm = this.fb.group({
      couriers: [[]],
      guaranteeTime:  ['',  [Validators.required]],
      guaranteeType:  ['', [Validators.required]],
      masterId:  [''],
      varians: this.fb.array([]),
    });

    this.productsSandbox.courier();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.masterId = params.id;
      this.addProductForm.patchValue({
        masterId: this.masterId
      });

      console.log(params);
      console.log('console.log(this.router.url): ', this.router.url);
      console.log(this.router.url);
      this.routeUrl = this.router.url === '/products/' + params.id;
      if (this.router.url === '/products/' + params.id) {
        this._getDetailProd();

        this.productService.getProdVariant(params.id).subscribe(data => {
          console.log('data : variant', data);
          this.VariantAttr = data;
          this.VariantAttr.forEach((variant, index) => {
            this.addVariants();
            const control = <FormArray>this.addProductForm.get('varians');
            control.at(index).patchValue({
              masterVarianId: variant.masterVarianId,
            });
          });
        });

      } else {
        this.productService.getDetailById(params.id).subscribe(data => {

          this.product = data.data;
          this.displayImage = this.product.imageUrl[0];
          console.log('data:edited', data.data);
          this.addProductForm.patchValue({
            guaranteeType: this.product.guaranteeType,
            guaranteeTime: this.product.guaranteeTime,
            couriers: (this.productId) ? this.product.couriers.filter(x => x.isUse === true).map(x => x.code) : [],
            masterId:  this.product.masterId,
            productId: this.product.productId
          });
        });

        this.productService.getProdVarian(params.id).subscribe(data => {
          this.VariantAttr = data;
          data.forEach((dataV2, index) => {
            this.addVariants();
            const control = <FormArray>this.addProductForm.get('varians');
            control.at(index).patchValue({
              masterVarianId: dataV2.masterVarianId,
              pricelist: dataV2.data.pricelist,
              specialPrice: dataV2.data.specialPrice,
              qty: dataV2.data.qty,
              productId: dataV2.data.productId,
              isUsed: dataV2.isUse
            });
            if (dataV2.isUse === false) {
              control.at(index).patchValue({
                pricelist: '',
                specialPrice: '',
                qty: '',
              });
              control.at(index).get('pricelist').disable();
              control.at(index).get('specialPrice').disable();
              control.at(index).get('qty').disable();
            }

          });
          if (this.VariantAttr.length >= 1) {
            console.log('asd');
            this.isFlase = true;
          }

          // const isUsed = variant.controls['isUsed'].value;
          // if (isUsed === false) {
          //   variant.controls['pricelist'].disable();
          //   variant.controls['specialPrice'].disable();
          //   variant.controls['qty'].disable();
          // } else {
          //   variant.controls['pricelist'].enable();
          //   variant.controls['specialPrice'].enable();
          //   variant.controls['qty'].enable();
          // }
          // console.log(variant.controls['isUsed'].value);



          // if (control.isUsed === false) {
          //   .controls['pricelist'].disable();
          //   variant.controls['specialPrice'].disable();
          //   variant.controls['qty'].disable();
          // } else {
          //   variant.controls['pricelist'].enable();
          //   variant.controls['specialPrice'].enable();
          //   variant.controls['qty'].enable();
          // }


        });
      }
    });
  }

  currencyFormat(num) {
    return 'Rp' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, 'Rp1,');
  }

  toggleControl(variant: FormArray) {
    const isUsed = variant.controls['isUsed'].value;
    if (isUsed === false) {
      variant.controls['pricelist'].disable();
      variant.controls['specialPrice'].disable();
      variant.controls['qty'].disable();
    } else {
      variant.controls['pricelist'].enable();
      variant.controls['specialPrice'].enable();
      variant.controls['qty'].enable();
    }
  }

  private _initVariants(): FormGroup {
    return this.fb.group({
      masterVarianId: [''],
      pricelist: ['', [Validators.required, Validators.min(100)]],
      qty: ['', [Validators.required, Validators.max(5)]],
      specialPrice: [''],
      isUsed: [true],
      discount: [''],
      productId: ['']
    }, {validator: compareTwoPrices});
  }

  /**
   * Add variant form group array
   */
  public addVariants(): void {
    // add variants to the list
    const control = <FormArray>this.addProductForm.get('varians');
    control.push(this._initVariants());
  }

  /**
   * Get form array varians
   * @param form Form group
   */
  public getVariants(form) {
    return form.controls.varians.controls;
  }

  public getVariantsx(form) {
    return form.controls.varians.controls;
  }

  public applyForAll() {
    this.getVariants(this.addProductForm).forEach(control => {
      control.patchValue({
        pricelist: this.daddyPrice,
        specialPrice: this.dadySpecialPrice,
        qty: this.dadyStock
      });
    });
    this.calculateDiscount();
  }

  // TODO: Change to the correct method
  btncouroer() {
    this.isFlase = true;

  }

  xx() {
    const control = <FormArray>this.addProductForm.get('varians');
    control.value.forEach(asd => {
      if (asd.isUsed) {
        console.log('123');
      }
    });
    console.log(control.value);
  }

  // TODO: Change to the correct method
  btncouroerfalse() {
    this.isFlase = false;
  }

  public onChangeCourier(code: string, checked: boolean) {
    const couriers = this.addProductForm.get('couriers').value;
    console.log(couriers);
    if (checked) {
      couriers.push(code);
    } else {
      const index = couriers.findIndex(x => x === code);
      if (index !== -1) { couriers.splice(index, 1); }
    }

    this.addProductForm.patchValue({
      couriers: couriers,
      // masterId: this.masterId
    });
  }

  public postProductV2() {

    // console.log('invalid controls: ', this.findInvalidControls(this.addProductForm));

    // this.loadingService.show();
    this.submitted = true;
    this.calculateDiscount();

    const control = <FormArray>this.addProductForm.get('varians');
    const variantsOnlyChecked = control.value.filter(item => item.isUsed !== false);

    // console.log('control: ', control);

    const variantsControls = <FormArray>this.getVariants(this.addProductForm);

    // return;
    const productFormModified = this.addProductForm.value;
    productFormModified.varians = variantsOnlyChecked;

    console.log('productFormModified: ', productFormModified);


    const c = variantsOnlyChecked;
    const xx = variantsOnlyChecked.forEach(element => {
      if (element.pricelist < 100) {
      swal(
        'Warning',
        'harga tidak boleh dibawah 100',
        'warning'
      );
      this.loadingService.hide();
      return;
      }
    });

    if (this.addProductForm.get('couriers').value.length <= 0) {
      swal(
        'Warning',
        'Jasa pengiriman harus dipilih',
        'warning'
      );
      this.loadingService.hide();
      return;
    }

    if (this.addProductForm.valid) {

      if ( this.router.url === '/edit-products/' + this.masterId) {
        console.log('this.addProductForm.value-asd---: ', this.addProductForm.value);
        this.productService.editProductPost(productFormModified).subscribe(response => {
          // console.log(response);
            swal(
            'belisada.co.id',
            response.message,
            (response.status === 0) ? 'error' : 'success'
          );
          if (response.status === 1) {
            this.router.navigate(['/listing-product']);
            this.loadingService.hide();
          }
        });
      } else {

        console.log('this.addProductForm.value----: ', this.addProductForm.value);
        this.productService.addProductV2(productFormModified).subscribe(response => {
          // console.log(response);
            swal(
            'belisada.co.id',
            response.message,
            (response.status === 0) ? 'error' : 'success'
          );
          if (response.status === 1) {
            this.router.navigate(['/listing-product']);
            this.loadingService.hide();
          }
        });

      }
    } else {
      console.log('salah nih');
      this.loadingService.hide();
    }
  }
  calculateDiscount() {
      const controls = this.getVariants(this.addProductForm);
      controls.forEach(control => {
        const con: FormGroup = control;
        // console.log('control: ', control);
        control.patchValue({
          discount: Math.round(100 - ((+con.controls['specialPrice'].value / +con.controls['pricelist'].value) * 100))
        });
        // console.log('calculateDiscount', control.controls['discount'].value);
      });
  }

  addVarian() {
    this.showRequestVarian = true;
    console.log('showRequestVarian: ', this.showRequestVarian);
  }

  public onChangeVariant(code: string, checked: boolean, e) {
    const variant = this.addProductForm.get('varians').value;
    this.masterVariantId = code;
    // console.log(variant, e);
    if (checked) {
      variant.push(code);
    } else {
      const index = variant.findIndex(x => x === code);
      if (index !== -1) { variant.splice(index, 1); }
    }
    this.addProductForm.patchValue({
      varians: variant,
    });
  }

  private _getWaranty() {
    this.subscriptions.push(this.productsSandbox.productWarranty$.subscribe((warr: any) => {
      if (warr) {
        this.warr = warr;
      }
    }));
    this.subscriptions.push(this.productsSandbox.productWarrantyLong$.subscribe((warrLong: any) => {
      if (warrLong) {
        this.warrLong = warrLong;
      }
    }));
  }

  private _getDetailProd() {
    // getProdDetail(id: any)
    this.subscriptions.push(this.productsSandbox.productAdd$.subscribe((product: any) => {
      if (product) {
        console.log('product: ', product);
        this.product = product.data;
        this.displayImage = this.product.imageUrl[0];
      }
    }));
  }
  numberCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  // !-- Utilities for checking invalid field from reactive form control
  public findInvalidControls(form) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
