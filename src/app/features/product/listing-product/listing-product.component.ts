import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService, StoreService } from '@belisada-seller/core/services';
import { ProductListing, ProductDetailList, ProductDetailData, ProductSuggestion } from '@belisada-seller/core/models';
import { Subscription } from 'rxjs';
import { ProductsSandbox } from '../products.sandbox';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from '@belisada-seller/core/services/globals/globals';
import swal from 'sweetalert2';
import { environment } from '@env/environment';
import { Location } from '@angular/common';
// import { ProductsSandbox } from '../products.sandbox';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'bss-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {
  public rowSelected: number;
  prodImg: any;
  proddetail: ProductListing = new ProductListing();
  myForm: FormGroup;
  prodDetailId: ProductDetailList[] = [];
  productDetail: ProductDetailData = new ProductDetailData();
  ach;
  imgIndex: string;
  lastPage: number;
  currentPage: number;
  pages: any = [];
  private subscriptions: Array<Subscription> = [];
  productSuggestionList: ProductSuggestion[];
  onProductNameFocus: Boolean = false;
  name: string;
  checkIfLength: Boolean = false;
  a: any;
  b;

  toggleArrBol: boolean[];


  status = 'AP';

  hasAddress: Boolean = true;
  // private subscriptions: Array<Subscription> = [];
  faCoffee = faPlusCircle;
  constructor(
    private fb: FormBuilder,
    private prodSe: ProductService,
    public productsSandbox: ProductsSandbox,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    // public productsSandbox: ProductsSandbox,
  ) {
    this.toggleArrBol = [];
    this.productDetail.description = '';
    this.rowSelected = -1;
    this.prodImg = environment.thumborUrl + 'unsafe/fit-in/80x80/';
  }

  ngOnInit() {
    // this.subscriptions.push(this.productsSandbox.products$.subscribe((product: any) => {
    //   if (!product) {
    //     this.productsSandbox.loadProducts({
    //       page: 1,
    //       itemperpage: 10,
    //       status : 'ALL'
    //     });
    //   }
    // }));
    // this.subscriptions.push(this.productsSandbox.productSearch$.subscribe((res: any) => {
    //   if (!res) {
    //     this.productsSandbox.getProductSearch({
    //       q: 'samsung'
    //     });
    //     console.log(res);
    //   }
    // }));
    this.getProfile();
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
    });
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      this.status = (queryParam.status) ? queryParam.status : 'AP';
      this.prodList();
    });
  }

  prodList(q?: string) {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      status: this.status
    };

    if (q) queryParams['name'] = q;

    this.prodSe.getProdListing(queryParams).subscribe(response => {
      this.proddetail = response;
      this.a = response.dataCount;
      this.pages = [];
      this.lastPage = this.proddetail.pageCount;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.proddetail.pageCount) {
          this.pages.push(r);
        }
      }

    });
  }

  searchProductName(e) {
    this.prodList(e.target.value);
  }
  selectProductName(mProductId, name) {
    this.name = name;
    this.b = mProductId;
    this.productsSandbox.productAdd(mProductId[0]);
    this.router.navigate(['/listing-product/' + mProductId]);
    // window.location.reload();

  }
  onProductNameBlur(): void {
    setTimeout(() => { this.onProductNameFocus = false; }, 200);
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.pageCount) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/listing-product'], { queryParams: {page: page, status: this.status}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  public openCloseRow(idReserva: number): void {

    this.prodSe.getDetailById(idReserva).subscribe(res => {
      this.productDetail = res.data;
      this.productDetail.couriers = this.productDetail.couriers.filter(x => x.isUse === true);

      this.imgIndex = this.productDetail.imageUrl[0];
    });
    if (this.rowSelected === -1) {
      this.rowSelected = idReserva;
      console.log('id', idReserva);
    } else {
      if (this.rowSelected === idReserva) {
        this.rowSelected = -1;
      } else {
        this.rowSelected = idReserva;
      }
    }
  }

  bSlider(id, hide) {
    const paramS = {
      hide: hide,
      productId: id
    };
    const queryParams = {
      page: 1,
      itemperpage: 10,
      status : 'ALL'
    };
    this.prodSe.editHide(paramS).subscribe(res => {
      console.log('aaaa', res);
      this.prodSe.getProdListing(queryParams).subscribe(response => {
        this.proddetail = response;
        console.log('proddetail', this.proddetail);
      });
    });
  }

  goToEdit(e) {
    this.router.navigate(['/edit-products/' + e]);
    // window.location.reload();
    // location.reload();
  }

  selectImg(img) {
    this.imgIndex = img;
  }

  gotoAddPro() {
    if (this.hasAddress === false) {
      swal(
        'Peringatan',
        'Tolong lengkapi profile anda terlebih dahulu!',
        'warning'
      );
      return;
    }
    this.router.navigate(['/search-product-master']);
    console.log('asdasd');
  }

  onChange(email: any, isChecked: boolean) {
    const emailFormArray = <FormArray> this.myForm.controls.useremail;
    if (isChecked) {
      const editeD = {
        productId: email,
        qty: 0
      };
      this.prodSe.editStock(editeD).subscribe(respon => {
        console.log('message', respon.message);
        const queryParams = {
          page: 1,
          itemperpage: 10,
          status : 'ALL'
        };
        this.prodSe.getProdListing(queryParams).subscribe(response => {
        this.proddetail = response;
        console.log('proddetail', this.proddetail);
        });
      });
      emailFormArray.push(new FormControl(email));

    } else {
      const index = emailFormArray.controls.findIndex(x => x.value === email);
      emailFormArray.removeAt(index);

    }
  }

  getProfile() {
    this.storeService.profile().subscribe(profile => {
      if (profile.addressId === 0 ) {
        console.log('asssdasd');
        this.hasAddress = false;
      }
    });
  }

}
