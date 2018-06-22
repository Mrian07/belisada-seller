import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  apr: AddProductRequest = new AddProductRequest();
  spec: any[] = [];

  brandList: BrandList = new BrandList();
  currentPgBrand: number;
  limitBrand: Number = 100;
  brandName: string;
  onBrandFocus: Boolean = false;

  categoryList: CategoryList = new CategoryList();
  currentPgCategory: number;
  limitCategory: Number = 20;
  categoryName: string;
  onCategoryFocus: Boolean = false;

  categoryAttributes: CategoryAttribute[];

  classification: Reference[];
  stock: Reference[];
  warranty: Reference[];
  couriers: Courier[];

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
  ) {
    this.brandList.data = [];
    this.categoryList.data = [];
    this.categoryAttributes = [];
    this.apr.couriers = [];
    this.apr.imageUrl = [];
    this.apr.specification = [];
  }

  ngOnInit() {
    this.currentPgBrand = 1;
    this.currentPgCategory = 1;

    this.getBrandInit();
    this.getCategoryInit();
    this.getClasificationInit();
    this.getStockInit();
    this.getWarrantyInit();
    this.getCourier();
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
  getCategoryInit() {
    const queryParams = {
      page: this.currentPgCategory,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C3
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList = response;
    });
  }

  onCategoryBlur() {
    setTimeout(() => { this.onCategoryFocus = false; }, 200);
  }

  searchCategory() {
    const qsCategory = this.categoryName;
    const queryParams = {
      page: this.currentPgCategory = 1,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C3
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList = response;
    });
  }

  selectCategory(category) {
    this.categoryName = category.name;
    this.apr.categoryThreeId = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      console.log('this.categoryAttributes: ', this.categoryAttributes);
    });
  }

  onCategoryScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--category');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgCategory += 1,
        itemperpage: this.limitCategory,
        name: this.categoryName === undefined ? '' : this.categoryName,
        type: CategoryTypeEnum.C3
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

  onProductSubmit() {
    this.specMapping(this.spec);

    this.productService.addProduct(this.apr).subscribe(response => {
      swal(
        'belisada.co.id',
        response.message,
        'success'
      );
      this.router.navigate(['/seller']);
    });
  }
}
