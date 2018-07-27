import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from '@belisada-seller/core/services';
import { ProductListing, ProductDetailList, ProductDetailData } from '@belisada-seller/core/models';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  faCoffee = faPlusCircle;

  constructor(
    private fb: FormBuilder, private prodSe: ProductService,  private router: Router) {
    this.rowSelected = -1;
    this.prodImg = 'http://image.belisada.id:8888/unsafe/80x80/';
   }

  ngOnInit() {
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
    });
    const queryParams = {
      page: 1,
      itemperpage: 10,
      status : 'ALL'
    };
    this.prodSe.getProdListing(queryParams).subscribe(response => {
    this.proddetail = response;
    console.log('proddetail', this.proddetail);
    });
  }

  public openCloseRow(idReserva: number): void {


  this.prodSe.getDetailById(idReserva).subscribe(res => {
  this.productDetail = res.data;
  this.imgIndex = this.productDetail.imageUrl[0];
  console.log(res.data);
});
    if (this.rowSelected === -1) {
      this.rowSelected = idReserva;
      console.log('id', idReserva);
    } else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1;
      } else {
        this.rowSelected = idReserva;
      }
    }
  }
  bSlider(id) {
    const paramS = {
      hide: true,
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
  selectImg(img) {
    this.imgIndex = img;
  }

  gotoAddPro() {
    this.router.navigate(['/add-product']);
    console.log('asdasd');
  }
  

  bSliderF(id) {
    const paramS = {
      hide: false,
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
      const index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);

    }
  }

}
