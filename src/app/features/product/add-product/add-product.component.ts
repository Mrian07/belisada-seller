import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  BrandService, CategoryService, AttributeService, ReferenceService,
  ProductService, CourierService
} from '@belisada-seller/core/services';

import {
  BrandList, AddProductRequest, CategoryList, CategoryAttribute,
  ProductSpecification, Reference, Courier, EditProductRequest, ProductDetailData, ProductSuggestion, SpecificationList
} from '@belisada-seller/core/models';

import { CategoryTypeEnum, ReferenceCodeEnum } from '@belisada-seller/core/enum';

import swal from 'sweetalert2';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  spec: any[] = [];

  cte = CategoryTypeEnum;

  addProductForm: FormGroup;

  measurementType: any;

  isDiscountActive: Boolean = false;
  totalDiscount: number;
  errMaxDiscount: Boolean = false;

  brandList: BrandList = new BrandList();
  currentPgBrand: number;
  limitBrand: Number = 100;
  onBrandFocus: Boolean = false;
  onProductNameFocus: Boolean = false;

  productSuggestionList: ProductSuggestion[];

  categoryList = {
    C1: new CategoryList(),
    C2: new CategoryList(),
    C3: new CategoryList()
  };
  categoryName = {
    C1: '',
    C2: '',
    C3: ''
  };
  categoryId = {
    C1: '',
    C2: '',
    C3: ''
  };
  onCategoryFocus = {
    C1: false,
    C2: false,
    C3: false
  };

  disabled: Boolean = false;
  submitted: Boolean = false;

  categoryAttributes: CategoryAttribute[];

  classifications: Reference[];
  warranty: Reference[];
  couriers: Courier[];

  productId: number;
  testing: any;
  productDetail: ProductDetailData = new ProductDetailData();
  CheckingKatProdC2: boolean;


  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private referenceService: ReferenceService,
    private productService: ProductService,
    private courierService: CourierService,
    private el: ElementRef,
    private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private title: Title,
  ) {
    this.productSuggestionList = [];
    this.currentPgBrand = 1;
    this.measurementType = 0;
    this.brandList.data = [];
    this.categoryList.C1.data = [];
    this.categoryList.C2.data = [];
    this.categoryList.C3.data = [];
    this.categoryAttributes = [];
    this.testing = 'hi';
    this.productId = this.route.snapshot.params.id;
    console.log( this.route.snapshot.params.id);
  }

  // convenience getter for easy access to form fields
  get f() { return this.addProductForm.controls; }

  ngOnInit() {
    this.formData();
    this.getBrandInit();
    this.getCategoryInit(CategoryTypeEnum.C1);
    this.getReferenceInit(ReferenceCodeEnum.CLASIFICATION);
    this.getReferenceInit(ReferenceCodeEnum.WARRANTY);

    if (this.productId) {
      this.title.setTitle('Belisada - Edit Product');
      this.fillFormData(this.productId);
    } else {
      this.title.setTitle('Belisada - Add Product');
      this.getCourier();
    }
  }

  private formData() {
    this.addProductForm = this.fb.group({
      name: ['', [Validators.required]],
      masterId: [''],
      brandId: [''],
      brandName: [''],
      categoryThreeId: ['', [Validators.required]],
      classification: ['', [Validators.required]],
      couriers: [[], [Validators.required]],
      description: ['', [Validators.required]],
      // dimensionsWidth: ['', [Validators.required]],
      // dimensionsheight: ['', [Validators.required]],
      // dimensionslength: ['', [Validators.required]],
      guaranteeTime: ['', [Validators.required]],
      imageUrl: [[], [Validators.required]],
      pricelist: ['', [Validators.required, Validators.min(1)]],
      specialPrice: [''],
      discount: [''],
      qty: ['', [Validators.required]],
      specification: [[]],
      weight: ['', [Validators.required]]
    });
  }

  fillFormData(productId) {
    this.productService.getDetailById(productId).subscribe(response => {
      const data = response.data;
      this.fillFormPatchValue(data);
    });
  }

  fillFormPatchValue(data: ProductDetailData) {
    if (this.productId) {
      this.couriers = data.couriers;
    }
    this.addProductForm.patchValue({
      name: data.name,
      masterId: data.productId,
      brandId: data.brandId,
      brandName: data.brandName,
      categoryThreeId: (data.categoryThreeId !== 0) ? data.categoryThreeId : data.categoryTwoId,
      classification: data.classification,
      couriers: (this.productId) ? data.couriers.filter(x => x.isUse === true).map(x => x.code) : [],
      description: data.description,
      // dimensionsWidth: data.dimensionsWidth,
      // dimensionsheight: data.dimensionsheight,
      // dimensionslength: data.dimensionslength,
      guaranteeTime: data.guaranteeTime,
      imageUrl: data.imageUrl,
      pricelist: data.pricelist,
      specialPrice: data.specialPrice,
      discount: data.discount,
      qty: data.qty,
      specification: data.specification,
      weight: data.weight
    });
    this.categoryName = {
      C1: data.categoryOneName,
      C2: data.categoryTwoName,
      C3: data.categoryThreeName
    };

    this.getCategoryInit(CategoryTypeEnum.C2, data.categoryOneId);
    this.getCategoryInit(CategoryTypeEnum.C3, data.categoryTwoId);

    const queryParams = {
      categoryid: (data.categoryThreeId === 0) ? data.categoryTwoId : data.categoryThreeId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      this.fillFormSpecification(data.specification);
    });
    console.log('this.addProductForm: ', this.addProductForm);

    this.calculateDiscount();
    this.disableControl(true);
  }

  disableControl(condition: Boolean) {
    this.disabled = condition;
    const action = condition ? 'disable' : 'enable';
    this.addProductForm.controls['name'][action]();
    this.addProductForm.controls['brandId'][action]();
    this.addProductForm.controls['brandName'][action]();
    // this.addProductForm.controls['categoryThreeId'][action]();
    // this.addProductForm.controls['classification'][action]();
    // this.addProductForm.controls['couriers'][action]();
    this.addProductForm.controls['description'][action]();
    // this.addProductForm.controls['dimensionsWidth'][action]();
    // this.addProductForm.controls['dimensionsheight'][action]();
    // this.addProductForm.controls['dimensionslength'][action]();
    // this.addProductForm.controls['guaranteeTime'][action]();
    this.addProductForm.controls['imageUrl'][action]();
    // this.addProductForm.controls['pricelist'][action]();
    // this.addProductForm.controls['specialPrice'][action]();
    // this.addProductForm.controls['discount'][action]();
    // this.addProductForm.controls['qty'][action]();
    this.addProductForm.controls['specification'][action]();
    this.addProductForm.controls['weight'][action]();
  }

  searchProductName(event) {
    this.addProductForm.patchValue({
      masterId: undefined
    });
    const queryParams = {
      q: event.target.value
    };
    this.productService.getProductSuggestion(queryParams).subscribe(response => {
      this.productSuggestionList = response;
    });
  }

  selectProductName(product: ProductSuggestion) {
    console.log('product: ', product);
    this.productService.getProductSuggestionDetail(product.productId).subscribe(response => {
      this.fillFormPatchValue(response.data);
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
    const imageUrl: string[] = this.addProductForm.get('imageUrl').value;
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (imageUrl.length < 5) {
          imageUrl.push(myReader.result);
          this.addProductForm.patchValue({
            imageUrl: imageUrl
          });
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
    const imageUrl: string[] = this.addProductForm.get('imageUrl').value;
    if (index > -1) {
      imageUrl.splice(index, 1);
    }
  }
  // --- Image product end


  onProductNameBlur(): void {
    setTimeout(() => { this.onProductNameFocus = false; }, 200);
  }

  /**
   * Product Brand Search
   */
  getBrandInit() {
    const brandName = this.addProductForm.get('brandName').value;
    const queryParams = {
      page: this.currentPgBrand,
      itemperpage: this.limitBrand,
      name: brandName === undefined ? '' : brandName
    };
    this.brandService.getListBrand(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  searchBrand(): void {
    this.addProductForm.patchValue({
      brandId: undefined,
    });
    const qsBrand = this.addProductForm.get('brandName').value;
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
    this.addProductForm.patchValue({
      brandId: brand.brandId,
      brandName: brand.name
    });
  }

  onBrandBlur(): void {
    setTimeout(() => { this.onBrandFocus = false; }, 200);
  }

  onBrandScrollDown () {
    const brandName = this.addProductForm.get('brandName').value;
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--brand');
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgBrand += 1,
        itemperpage: this.limitBrand,
        name: brandName === undefined ? '' : brandName
      };
      this.brandService.getListBrand(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
  }

  onCategoryBlur(categoryType) {
    setTimeout(() => { this.onCategoryFocus[categoryType] = false; }, 200);
  }

  searchCategory(categoryType, parentid?) {
    const queryParams = {
      name: this.categoryName[categoryType] === undefined ? '' : this.categoryName[categoryType],
      type: categoryType
    };
    if (parentid) {
      queryParams['parentid'] = parentid;
    }
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList[categoryType] = response;
    });
  }

  selectCategory(category) {
    this.addProductForm.patchValue({
      categoryThreeId: (category.type !== CategoryTypeEnum.C1) ? category.categoryId : 0
    });
    this.categoryName[category.type] = category.name;
    this.categoryId[category.type] = category.categoryId;
    const queryParams = {
      categoryid: category.categoryId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      this.categoryAttributes.forEach((categoryAttribute) => {
        this.spec[categoryAttribute.attributeId] = '';
      });

      let categoryType;
      if (category.type === CategoryTypeEnum.C1) {
        categoryType = CategoryTypeEnum.C2;
        this.categoryName.C2 = '';
        this.categoryName.C3 = '';
      } else if (category.type === CategoryTypeEnum.C2) {
        categoryType = CategoryTypeEnum.C3;
        this.categoryName.C3 = '';
      } else {
        categoryType = false;
      }
      if (categoryType) {
        this.getCategoryInit(categoryType, category.categoryId);
      }
    });
  }

  getCategoryInit(categoryType, parentid?) {
    const queryParams = {
      type: categoryType,
      all: true
    };
    if (parentid) {
      queryParams['parentid'] = parentid;
    }
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList[categoryType] = response;
    });
  }
  // --- Product category end

  /**
   * Specifications
   */
  fillFormSpecification(specifications: SpecificationList[]) {
    specifications.forEach((specification) => {
      this.spec[specification.attributeId] = specification.attributeValueId;
    });
  }
  // --- Specifications end

  /**
   * Calculate discount
   */
  calculateDiscount() {
    const pricelist = this.addProductForm.get('pricelist').value;
    const specialPrice = this.addProductForm.get('specialPrice').value;
    console.log(pricelist + ' ------ ' + specialPrice);
    if (specialPrice > 0) {
      if (+specialPrice >= +pricelist) {
        this.errMaxDiscount = true;
      } else {
        this.errMaxDiscount = false;
      }
    }
    console.log(this.errMaxDiscount);
    if (pricelist && specialPrice && specialPrice !== 0) {
      this.isDiscountActive = true;
      this.totalDiscount = pricelist - specialPrice;
      this.addProductForm.patchValue({
        discount: Math.round(100 - ((specialPrice / pricelist) * 100))
      });
      // this.apr.discount = Math.round(100 - ((specialPrice / pricelist) * 100));
    } else {
      this.isDiscountActive = false;
    }
  }

  /**
   * Reference
   */
  getReferenceInit(referenceCode) {
    const queryParams = {
      code: referenceCode
    };
    this.referenceService.getReference(queryParams).subscribe(response => {
      switch (referenceCode) {
        case ReferenceCodeEnum.CLASIFICATION:
            this.classifications = response;
          break;
        case ReferenceCodeEnum.WARRANTY:
            this.warranty = response;
          break;
        default:
            console.log('ERROR: code not found.');
          break;
      }
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
  onChangeCourier(code: string, checked: boolean) {
    const couriers = this.addProductForm.get('couriers').value;
    if (checked) {
      couriers.push(code);
    } else {
      const index = couriers.findIndex(x => x === code);
      if (index !== -1) { couriers.splice(index, 1); }
    }
    this.addProductForm.patchValue({
      couriers: couriers
    });
  }

  specMapping(specValues) {
    this.categoryAttributes.forEach(x => {
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
      const specification: ProductSpecification[] = this.addProductForm.get('specification').value;
      specification.push(productSpecification);
    });
  }

  calculateWeight() {
    if (this.measurementType === '1') {
      this.addProductForm.patchValue({
        weight: +this.addProductForm.get('weight').value * 1000
      });
    }
  }

  onProductSubmit() {
    this.submitted = true;
    this.specMapping(this.spec);
    this.calculateWeight();

    const imageUrl = this.addProductForm.get('imageUrl').value;

    if (imageUrl.length < 2 || imageUrl.length > 5) {
      swal(
        'Warning',
        'Maaf gambar produk tidak boleh kurang dari dua atau lebih dari lima',
        'warning'
      );
      return;
    }
    if (this.addProductForm.get('classification').value === '') {
      swal(
        'Warning',
        'Kondisi barang harus diisi',
        'warning'
      );
      return;
    }
    if (this.addProductForm.get('couriers').value.length <= 0) {
      swal(
        'Warning',
        'Metode pengiriman harus diisi',
        'warning'
      );
      return;
    }

    if (this.addProductForm.valid) {
      this.loadingService.show();
      if (this.productId) {
        const editProductRequest = new EditProductRequest();
        editProductRequest.classification = this.addProductForm.get('classification').value;
        editProductRequest.couriers = this.addProductForm.get('couriers').value;
        // editProductRequest.dimensionsheight = this.addProductForm.get('dimensionsheight').value;
        // editProductRequest.dimensionslength = this.addProductForm.get('dimensionslength').value;
        // editProductRequest.dimensionsWidth = this.addProductForm.get('dimensionsWidth').value;
        editProductRequest.discount = this.addProductForm.get('discount').value;
        editProductRequest.guaranteeTime = this.addProductForm.get('guaranteeTime').value;
        editProductRequest.pricelist = this.addProductForm.get('pricelist').value;
        editProductRequest.productId = this.productId;
        editProductRequest.qty = this.addProductForm.get('qty').value;
        editProductRequest.specialPrice = this.addProductForm.get('specialPrice').value;
        editProductRequest.weight = this.addProductForm.get('weight').value;

        this.productService.editProduct(editProductRequest).subscribe(response => {
          this.loadingService.hide();
          swal(
            'belisada.co.id',
            response.message,
            (response.status === 0) ? 'error' : 'success'
          );
          if (response.status === 1) {
            this.router.navigate(['/listing-product']);
          }
        });
      } else {
        this.productService.addProduct(this.addProductForm.value).subscribe(response => {
          this.loadingService.hide();
          swal(
            'belisada.co.id',
            response.message,
            (response.status === 0) ? 'error' : 'success'
          );
          if (response.status === 1) {
            this.router.navigate(['/listing-product']);
          }
        });
      }
    }
  }

  // !-- Utilities for checking invalid field from reactive form control
  public findInvalidControls() {
    const invalid = [];
    const controls = this.addProductForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  numberCheck(event: any) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  reset() {
    this.disableControl(false);
    this.categoryList.C2.data = [];
    this.categoryList.C3.data = [];
    this.categoryAttributes = [];
    this.categoryName = {
      C1: '',
      C2: '',
      C3: ''
    };
    this.categoryId = {
      C1: '',
      C2: '',
      C3: ''
    };
    this.addProductForm.reset({
      couriers: [],
      imageUrl: [],
      specification: []
    });
    this.getCourier();
    window.scrollTo(0, 0);
  }

  cancel() {
    swal({
      title: 'Warning',
      text: 'Apakah anda yakin ingin keluar? Perubahan yang anda buat akan hilang!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.addProductForm.reset();
        this.router.navigate(['/listing-product']);
      }
    });
  }
}
