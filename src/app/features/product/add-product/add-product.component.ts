import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {
  BrandService, CategoryService, AttributeService, ReferenceService,
  ProductService, CourierService
} from '@belisada-seller/core/services';

import {
  BrandList, AddProductRequest, CategoryList, CategoryAttribute,
  ProductSpecification, Reference, Courier
} from '@belisada-seller/core/models';

import { CategoryTypeEnum } from '@belisada-seller/core/enum';

import swal from 'sweetalert2';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  apr: AddProductRequest = new AddProductRequest();
  spec: any[] = [];

  measurementType: any;

  isDiscountActive: Boolean = false;
  totalDiscount: number;
  errMaxDiscount: Boolean = false;

  idC1: number;
  idC2: number;
  idC3: number;

  brandList: BrandList = new BrandList();
  currentPgBrand: number;
  limitBrand: Number = 100;
  brandName: string;
  onBrandFocus: Boolean = false;

  categoryList: CategoryList = new CategoryList();
  categoryListC2: CategoryList = new CategoryList();
  categoryListC3: CategoryList = new CategoryList();
  currentPgCategory: number;
  limitCategory: Number = 20;
  categoryName: string;
  categoryNameC2: string;
  categoryNameC3: string;
  onCategoryFocus: Boolean = false;

  onCategoryFocusC2: Boolean = false;
  onCategoryFocusC3: Boolean = false;

  categoryAttributes: CategoryAttribute[];

  classification: Reference[];
  stock: Reference[];
  warranty: Reference[];
  couriers: Courier[];
  checkName: any;


  form: FormGroup;
  formDesc: FormGroup;
  formGaransi: FormGroup;
  formBerat: FormGroup;
  formDimensiP: FormGroup;
  formStok: FormGroup;
  formDimensiL: FormGroup;
  formDimensiT: FormGroup;
  formHarga: FormGroup;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private referenceService: ReferenceService,
    private productService: ProductService,
    private courierService: CourierService,
    private el: ElementRef,
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.measurementType = 0;
    this.brandList.data = [];
    this.categoryList.data = [];
    this.categoryListC2.data = [];
    this.categoryListC3.data = [];
    this.categoryAttributes = [];
    this.apr.couriers = [];
    this.apr.imageUrl = [];
    this.apr.specification = [];
  }

  ngOnInit() {
    this.formData();
    this.currentPgBrand = 1;
    this.currentPgCategory = 1;

    this.getBrandInit();
    this.getCategoryInitC1();
    // this.getCategoryInit();
    this.getClasificationInit();
    this.getStockInit();
    this.getWarrantyInit();
    this.getCourier();
  }

  private formData() {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
    this.formDesc = this.fb.group({
      desc: [null, [Validators.required]]
    });
    this.formGaransi = this.fb.group({
      garansi: [null, [Validators.required]]
    });
    this.formBerat = this.fb.group({
      berat: [null, [Validators.required]]
    });
    this.formStok = this.fb.group({
      stok: [null, [Validators.required]]
    });
    this.formDimensiP = this.fb.group({
      dimensiP: [null, [Validators.required]]
    });
    this.formDimensiP = this.fb.group({
      dimensiP: [null, [Validators.required]]
    });
    this.formDimensiL = this.fb.group({
      dimensiL: [null, [Validators.required]]
    });
    this.formDimensiT = this.fb.group({
      dimensiT: [null, [Validators.required]]
    });
    this.formHarga = this.fb.group({
      harga: [null, [Validators.required]],
      specialPrice: [0]
    });
  }

  /**
   * Image product start
   */
  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }

  readThis(files: any[]): void {
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (this.apr.imageUrl.length < 5) {
          this.apr.imageUrl.push(myReader.result);
        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
      };
      myReader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    if (index > -1) {
      this.apr.imageUrl.splice(index, 1);
    }
  }
  // --- Image product end

  /**
   * Product Brand Search
   */
  getBrandInit() {
    const queryParams = {
      page: this.currentPgBrand,
      itemperpage: this.limitBrand,
      name: this.brandName === undefined ? '' : this.brandName
    };
    this.brandService.getListBrand(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

   isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  isFieldValidHarga(field: string) {
    return !this.formHarga.get(field).valid && this.formHarga.get(field).touched;
  }
  isFieldValidDesc(field: string) {
    return !this.formDesc.get(field).valid && this.formDesc.get(field).touched;
  }
  isFieldValidGaransi(field: string) {
    return !this.formGaransi.get(field).valid && this.formGaransi.get(field).touched;
  }
  isFieldValidBerat(field: string) {
    return !this.formBerat.get(field).valid && this.formBerat.get(field).touched;
  }
  isFieldValidStok(field: string) {
    return !this.formStok.get(field).valid && this.formStok.get(field).touched;
  }
  isFieldValidDimensiP(field: string) {
    return !this.formDimensiP.get(field).valid && this.formDimensiP.get(field).touched;
  }
  isFieldValidDimensiL(field: string) {
    return !this.formDimensiL.get(field).valid && this.formDimensiL.get(field).touched;
  }
  isFieldValidDimensiT(field: string) {
    return !this.formDimensiT.get(field).valid && this.formDimensiT.get(field).touched;
  }

  onBrandBlur() {
    setTimeout(() => { this.onBrandFocus = false; }, 200);
  }

  searchBrand() {
    const qsBrand = this.brandName;
    const queryParams = {
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      name: qsBrand === undefined ? '' : qsBrand
    };
    this.brandService.getListBrand(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  selectBrand(brand) {
    this.brandName = brand.name;
    this.apr.brandId = brand.brandId;
  }

  onBrandScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--brand');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgBrand += 1,
        itemperpage: this.limitBrand,
        name: this.brandName === undefined ? '' : this.brandName
      };
      this.brandService.getListBrand(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
  }
  // --- Product brand end

  /**
   * Product Category Search
   */
  // getCategoryInit() {
  //   const queryParams = {
  //     page: this.currentPgCategory,
  //     itemperpage: this.limitCategory,
  //     name: this.categoryName === undefined ? '' : this.categoryName,
  //     type: CategoryTypeEnum.C3
  //   };
  //   this.categoryService.getListCategory(queryParams).subscribe(response => {
  //     this.categoryList = response;
  //   });
  // }

  onCategoryBlur() {
    setTimeout(() => { this.onCategoryFocus = false; }, 200);
  }

  onCategoryBlurC2() {
    setTimeout(() => { this.onCategoryFocusC2 = false; }, 200);
  }

  onCategoryBlurC3() {
    setTimeout(() => { this.onCategoryFocusC3 = false; }, 200);
  }

  searchCategory() {
    const qsCategory = this.categoryName;
    const queryParams = {
      page: this.currentPgCategory = 1,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C1
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList = response;
    });
  }

  searchCategoryC2() {
    const qsCategory = this.categoryNameC2;
    const queryParams = {
      parentid: this.idC1,
      page: this.currentPgCategory = 1,
      itemperpage: this.limitCategory,
      name: this.categoryNameC2 === undefined ? '' : this.categoryNameC2,
      type: CategoryTypeEnum.C2
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryListC2 = response;
    });
  }

  searchCategoryC3() {
    const qsCategory = this.categoryNameC3;
    const queryParams = {
      parentid: this.idC2,
      page: this.currentPgCategory = 1,
      itemperpage: this.limitCategory,
      name: this.categoryNameC3 === undefined ? '' : this.categoryNameC3,
      type: CategoryTypeEnum.C3
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryListC3 = response;
    });
  }

  selectCategory(category) {
    this.categoryName = category.name;
    this.apr.categoryThreeId = category.categoryId;
    this.idC1 = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;

      this.categoryNameC2 = '';
      this.categoryNameC3 = '';
      this.getCategoryInitC2(category.categoryId);
    });
  }

  selectCategoryC2(category) {
    this.categoryNameC2 = category.name;
    this.apr.categoryThreeId = category.categoryId;
    this.idC2 = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;

      this.categoryNameC3 = '';
      this.getCategoryInitC3(category.categoryId);
    });
  }

  selectCategoryC3(category) {
    this.categoryNameC3 = category.name;
    this.apr.categoryThreeId = category.categoryId;
    this.idC3 = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
    });
  }

  getCategoryInitC1() {
    const queryParams = {
      page: this.currentPgCategory,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C1
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList = response;
    });
  }

  getCategoryInitC2(id) {
    const queryParams = {
      type: CategoryTypeEnum.C2,
      parentid: id,
      all: true,
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryListC2 = response;
      console.log('list nya c2', response);
    });
  }

  getCategoryInitC3(id) {
    const queryParams = {
      type: CategoryTypeEnum.C3,
      parentid: id,
      all: true,
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryListC3 = response;
      console.log('list nya c3', response);
    });
  }

  // selectCategoryC2(categoryId) {
  //   // this.categoryName = category.name;
  //   // this.apr.categoryThreeId = category.categoryId;
  //   const queryParams = {
  //     parentid: categoryId,
  //     type: CategoryTypeEnum.C2,
  //     all: true,
  //     // page: this.currentPgCategory,
  //     // itemperpage: this.limitCategory,
  //     // name: this.categoryName === undefined ? '' : this.categoryName,
  //   };

  //   this.categoryService.getListCategory(queryParams).subscribe(response => {
  //     this.categoryListC2 = response;

  //     // console.log('Category c2lalang: ', response);
  //   });
  // }

  onCategoryScrollDown (type, parentid?) {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--category');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        parentid: (parentid) ? parentid : '',
        page: this.currentPgCategory += 1,
        itemperpage: this.limitCategory,
        name: this.categoryName === undefined ? '' : this.categoryName,
        type: type
      };
      this.categoryService.getListCategory(queryParams).subscribe(response => {
        this.categoryList.data = this.categoryList.data.concat(response.data);
      });
    }
  }

  onCategoryScrollDownAtr (type, categoryId) {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--category');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        parentid: categoryId,
        page: this.currentPgCategory += 1,
        itemperpage: this.limitCategory,
        name: this.categoryName === undefined ? '' : this.categoryName,
        type: type
      };
      this.categoryService.getListCategory(queryParams).subscribe(response => {
        this.categoryList.data = this.categoryList.data.concat(response.data);
      });
    }
  }
  // --- Product category end

  /**
   * Specifications
   */

  // --- Specifications end

  /**
   * Reference
   */
  getClasificationInit() {
    const queryParams = {
      code: 'CFT'
    };
    this.referenceService.getReference(queryParams).subscribe(response => {
      this.classification = response;
    });
  }

  getStockInit() {
    const queryParams = {
      code: 'STC'
    };
    this.referenceService.getReference(queryParams).subscribe(response => {
      this.stock = response;
    });
  }

  getWarrantyInit() {
    const queryParams = {
      code: 'GTI'
    };
    this.referenceService.getReference(queryParams).subscribe(response => {
      this.warranty = response;
    });
  }

  getCourier() {
    this.courierService.getCourier().subscribe(response => {
      this.couriers = response;
    });
  }

  /**
   * On change checkbox
   */
  onChangeCourier(code: string, isChecked: boolean) {

    if (isChecked) {
      this.apr.couriers.push(code);
    } else {
      const index = this.apr.couriers.findIndex(x => x === code);
      if (index !== -1) { this.apr.couriers.splice(index, 1); }
    }
  }

  specMapping(specValues) {
    this.categoryAttributes.forEach(x => {
      console.log('x: ', x);
      const productSpecification: ProductSpecification = new ProductSpecification();

      productSpecification.attributeId = x.attributeId;

      if (specValues[x.attributeId]) {
        productSpecification.attributeValueId =
        (x.isInstanceAttribute) ?
          null :
          x.data.find(i => i.attributeValueId === +specValues[x.attributeId]).attributeValueId;

        productSpecification.value =
          (x.isInstanceAttribute) ?
            specValues[x.attributeId] :
            x.data.find(i => i.attributeValueId === +specValues[x.attributeId]).value;
      }

      this.apr.specification.push(productSpecification);
    });
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onProductSubmit() {
    if (this.form.valid && this.formDesc.valid && this.formGaransi.valid && this.formBerat.valid && this.formDimensiP.valid
      && this.formStok.valid && this.formDimensiL.valid && this.formDimensiT.valid && this.formHarga.valid ) {
        this.loadingService.show();
        this.specMapping(this.spec);
        if (this.measurementType === '1') {
          this.apr.weight = +this.apr.weight * 1000;
        }
        this.productService.addProduct(this.apr).subscribe(response => {
          this.loadingService.hide();
          swal(
            'belisada.co.id',
            response.message,
            'success'
          );
          this.router.navigate(['/listing-product']);
        });
    } else {
      this.validateAllFormFields(this.form);
      this.validateAllFormFields(this.formDesc);
      this.validateAllFormFields(this.formGaransi);
      this.validateAllFormFields(this.formBerat);
      this.validateAllFormFields(this.formStok);
      this.validateAllFormFields(this.formDimensiP);
      this.validateAllFormFields(this.formDimensiL);
      this.validateAllFormFields(this.formDimensiT);
      this.validateAllFormFields(this.formHarga);
      console.log(this.apr.name);
      if (this.apr.imageUrl.length < 2 || this.apr.imageUrl.length > 5) {
        swal(
          'Warning',
          'Maaf gambar produk tidak boleh kurang dari dua atau lebih dari lima',
          'warning'
        );
        return;
      }
      if (this.apr.classification === undefined) {
        swal(
          'Warning',
          'Harap pilih kondisi barang',
          'warning'
        );
        return;
      }
      if (this.apr.couriers.length === 0) {
        swal(
          'Warning',
          'Anda belum memilih metode pengiriman.',
          'warning'
        );
        return;
      }
    }
  }

  numberCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  calculateDiscount() {
    console.log(this.apr.pricelist + ' ------ ' + this.apr.specialPrice);
    if (+this.apr.specialPrice >= +this.apr.pricelist) {
      this.errMaxDiscount = true;
    } else {
      this.errMaxDiscount = false;
    }
    console.log(this.errMaxDiscount);
    console.log('this.formHarga: ', this.formHarga);
    if (this.apr.pricelist && this.apr.specialPrice && this.apr.specialPrice !== 0) {
      this.isDiscountActive = true;
      this.totalDiscount = this.apr.pricelist - this.apr.specialPrice;
      this.apr.dicsount = Math.round(100 - ((this.apr.specialPrice / this.apr.pricelist) * 100));
    } else {
      this.isDiscountActive = false;
    }
  }
}
