import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsSandbox } from '../products.sandbox';
import { Subscription } from 'rxjs';
import { AddProductRequest, Reference, VariantAttr, Variant } from '@belisada-seller/core/models';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { environment } from '@env/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '@belisada-seller/core/services';
import swal from 'sweetalert2';
@Component({
  selector: 'bss-add-product-v2',
  templateUrl: './add-product-v2.component.html',
  styleUrls: ['./add-product-v2.component.scss']
})
export class AddProductV2Component implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  public product:        AddProductRequest;
  public warr: Reference[];
  warrLong: Reference[];
  VariantAttr: Variant[];
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

  public daddyPrice: number;
  public dadySpecialPrice: number;
  public dadyStock: number;


  constructor(
    public productsSandbox: ProductsSandbox,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    this.productStoreUrl = environment.thumborUrl + 'unsafe/50x50/center/filters:fill(fff)/';
    this.productImage = environment.thumborUrl + 'unsafe/80x80/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this._getWaranty();
    this._getDetailProd();
    
    this.addProductForm = this.fb.group({
      couriers: [[]],
      guaranteeTime:  [''],
      guaranteeType:  [''],
      masterId: [''],
      varians: this.fb.array([]),
      
    });
    this.subscriptions.push(this.productsSandbox.productVaraiant$.subscribe((varr: any) => {
      if (varr) {
        this.VariantAttr = varr;
        this.VariantAttr.forEach((variant, index) => {
          this.addVariants();
          const control = <FormArray>this.addProductForm.get('varians');
          control.at(index).patchValue({
            masterVarianId: variant.masterVarianId
          });
        });
        console.log('a', varr);
      }
        this.productsSandbox.courier();
    }));


    this.activatedRoute.params.subscribe((params: Params) => {
      this.masterId = params.id;
      console.log(params);
      console.log('console.log(this.router.url);: ',this.router.url);
      console.log(this.router.url);
      if(this.router.url === '/products/' + params.id) {
          console.log('123');
      } else {
       this.productService.getProductV2(params.id).subscribe(data => {
        this.getDataProdV2 = data.data;
        if ( data.status !== 0) {
          console.log('data:', data);
  
          this.addProductForm.patchValue({
            guaranteeType: data.data.guaranteeType,
            guaranteeTime: data.data.guaranteeTime
          });
            console.log('data:', data);

        }
       });
      }
      // console.log(window.location.href)
    });
  }

  private _initVariants(): FormGroup {
    // initialize our attributeVariants
    return this.fb.group({
      masterVarianId: [''],
      pricelist: [''],
      qty: [''],
      specialPrice: [''],
      isUsed: [true],
      discount: [''],
    });
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

  public applyForAll() {
    this.getVariants(this.addProductForm).forEach(control => {
      control.patchValue({
        pricelist: this.daddyPrice,
        specialPrice: this.dadySpecialPrice,
        qty: this.dadyStock
      });
    });
    // this.calculateDiscount();
  }

  // TODO: Change to the correct method
  btncouroer() {
    this.isFlase = true;

  }

  xx() {
    const control = <FormArray>this.addProductForm.get('varians');
   control.value.forEach(asd => {
     if(asd.isUsed) {
       console.log('123')
     }
      // console.log(asd.isUsed);
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
      masterId: this.masterId
    });
  }

  public postProductV2() {
    console.log(this.addProductForm.value);

    this.calculateDiscount();
    // this.productsSandbox.postProdV2(this.addProductForm.value);
    this.productService.addProductV2(this.addProductForm.value).subscribe(response => {
        // this.loadingService.hide();
        console.log(response);
        swal(
        'belisada.co.id',
        response.message,
        (response.status === 0) ? 'error' : 'success'
      );
      if (response.status === 1) {
        this.router.navigate(['/listing-product']);
      }
    });
    // const couriers = this.addProductForm.get('couriers').value;
    // console.log(couriers);
    // if (checked) {
    //   couriers.push(code);
    // } else {
    //   const index = couriers.findIndex(x => x === code);
    //   if (index !== -1) { couriers.splice(index, 1); }
    // }

    // this.addProductForm.patchValue({
    //   couriers: couriers,
    //   masterId: this.masterId
    // });
  }
  calculateDiscount() {
    // const control = <FormArray>this.addProductForm.get('varians').value;
    // this.VariantAttr.forEach((variant, index) => {
      // this.addVariants();
      const controls = this.getVariants(this.addProductForm);
      controls.forEach(control => {
        const con: FormGroup = control;
        console.log('control: ', control);
        control.patchValue({
          discount: Math.round(100 - ((+con.controls['specialPrice'].value / +con.controls['pricelist'].value) * 100))
        });
      })
      // controlz.at(index).patchValue({
      //   discount: Math.round(100 - ((+controlz.at(index) / +this.daddyPrice) * 100))
      // });
    // });
    // const pricelist = +this.addProductForm.get('pricelist').value;
    // const specialPrice = +this.addProductForm.get('specialPrice').value;
    // console.log(pricelist + ' ------ ' + specialPrice);
    // if (specialPrice > 0) {
    //   if (+specialPrice >= +pricelist) {
    //     this.errMaxDiscount = true;
    //   } else {
    //     this.errMaxDiscount = false;
    //   }
    // }
    // console.log(this.errMaxDiscount);
    // console.log(specialPrice);
    // if (pricelist && specialPrice && specialPrice !== 0) {
    //   this.isDiscountActive = true;
    //   this.totalDiscount = pricelist - specialPrice;
    //   this.addProductForm.patchValue({
    //     discount: Math.round(100 - ((specialPrice / pricelist) * 100))
    //   });
    //   // this.apr.discount = Math.round(100 - ((specialPrice / pricelist) * 100));
    // } else {
    //   console.log('error');
    //   this.isDiscountActive = false;
    // }
  }

  public onChangeVariant(code: string, checked: boolean, e) {
    const variant = this.addProductForm.get('varians').value;
    this.masterVariantId = code;
    console.log(variant, e);
    if (checked) {
      variant.push(code);
    } else {
      const index = variant.findIndex(x => x === code);
      if (index !== -1) { variant.splice(index, 1); }
    }
    this.addProductForm.patchValue({
      varians: variant,
      // pricelist: this.addProductForm.get('pricelist').value,

      // masterId: this.masterId
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
    this.subscriptions.push(this.productsSandbox.productAdd$.subscribe((product: any) => {
      if (product) {
        this.product = product.data;
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }
}
