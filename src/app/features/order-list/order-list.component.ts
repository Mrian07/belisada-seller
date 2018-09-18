import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransactionService } from '@belisada-seller/core/services/transaction/transaction.service';
import { Cart, Resi, ListOrderSellerResponse, InvoiceData } from '@belisada-seller/core/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { InvoiceData } from '@belisada-seller/core/models/transaction/transaction.model';

import { environment } from '@env/environment';
@Component({
  selector: 'bss-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  thumborUrl: string = environment.thumborUrl;
  disabled: Boolean = false;

  info: InvoiceData = new InvoiceData();

  // @Input() status: string;
  visible: boolean;
  status = 'ALL';

  listCart: Cart[];
  btnResi: boolean;
  createComForm: FormGroup;
  actualCourierPrice: number;
  noResi: string;
  orderNumber: string;
  isForm: Boolean = false;
  isProsesResi: Boolean = false;
  isErrorResi: Boolean = false;
  proddetail: ListOrderSellerResponse = new ListOrderSellerResponse();

  lastPage: number;
  currentPage: number;
  pages: any = [];
  a: any;
  b: any;


  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isStatus();
    this.formData();
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      this.status = (queryParam.status) ? queryParam.status : 'ALL';
      this.orderList((queryParam.status) ? queryParam.status : 'ALL');
    });
  }

  goToInvoice(e) {
    window.open(environment.baseUrlSeller + '/invoice-number/' + e, '_blank');
  }
  gotoCetakLabelPengiriman(e) {
    window.open(environment.apiUrl + '/seller/shippingpdf?orderNumber=' + e, '_blank');
  }

  private formData() {
    this.createComForm = this.fb.group({

      actualCourierPrice: new FormControl('', Validators.required),
      orderNumber: new FormControl('', Validators.required),
      noResi: new FormControl('', Validators.required)
    });
  }

  orderList(statusOrder?: string) {
    const queryParams = {
      itemperpage: 2,
      page: this.currentPage,
      status_order: statusOrder
    };

    this.transactionService.getListOrder(queryParams).subscribe(response => {
      this.listCart = response.content;
      this.proddetail = response;
      this.a = response.totalElements;
      this.pages = [];
      this.lastPage = this.proddetail.totalPages;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.proddetail.totalPages) {
          this.pages.push(r);
        }
      }
    });
  }

  close() {
    this.btnResi = false;
  }

  getOrderNumber(orderNumber) {
    this.isStatus();
    this.isForm = true;
    this.transactionService.getInvoice(orderNumber).subscribe(respon => {
      this.info = respon.data;
    });

    this.createComForm.patchValue({
        orderNumber : orderNumber
    });

  }

  isStatus() {
    this.isForm = false;
    this.isProsesResi = false;
    this.isErrorResi = false;
  }

  prosesResi() {

    const resi: Resi = new Resi();
    resi.actualCourierPrice = this.createComForm.controls['actualCourierPrice'].value;
    resi.noResi = this.createComForm.controls['noResi'].value;
    resi.orderNumber = this.createComForm.controls['orderNumber'].value;

    const data = {
      actualCourierPrice: resi.actualCourierPrice,
      noResi: resi.noResi,
      orderNumber: resi.orderNumber,
      status: null
    };

    this.transactionService.addResi(data).subscribe(response => {
      this.isStatus();
      if (response.status === 0) {
        this.isErrorResi = true;
      } else {
        this.isProsesResi = true;
      }

    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/listing-order'], { queryParams: {page: page, status: this.status}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
