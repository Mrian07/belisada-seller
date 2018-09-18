import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService, StoreService } from '@belisada-seller/core/services';
import { ProductListing, ProductDetailList, ProductDetailData } from '@belisada-seller/core/models';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Globals } from '@belisada-seller/core/services/globals/globals';
import swal from 'sweetalert2';
import { environment } from '@env/environment';

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
  a: any;

  hasAddress: Boolean = true;

  faCoffee = faPlusCircle;

  constructor(
    private fb: FormBuilder,
    private prodSe: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.rowSelected = -1;
    this.prodImg = environment.thumborUrl + 'unsafe/fit-in/80x80/';
  }

  ngOnInit() {
    this.getProfile();
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
    });
    // const queryParams = {
    //   page: 1,
    //   itemperpage: 10,
    //   status : 'ALL'
    // };
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
      };
      this.prodSe.getProdListing(queryParams).subscribe(response => {
        this.pages = [];
        this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
        this.proddetail = response;
        this.a = response.dataCount;
        this.lastPage = this.proddetail.pageCount;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.proddetail.pageCount) {
            this.pages.push(r);
          }
        }

        });
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.pageCount) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/listing-product'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
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
    this.router.navigate(['/edit-product/' + e]);
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
    this.router.navigate(['/add-product']);
    console.log('asdasd');
  }

  onChange(email: any, isChecked: boolean) {
    const emailFormArray = < FormArray > this.myForm.controls.useremail;
    if (isChecked) {
      const editeD = {
        productId: email,
        qtyType: '129'
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
      const index = emailFormArray.controls.findIndex(x => x.value == email);
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
