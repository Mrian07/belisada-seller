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
export class OrderListComponent implements OnInit, OnChanges {

  info: InvoiceData = new InvoiceData();

  // @Input() status: string;
  visible: boolean;
  private _status = '182';

  @Input()
  set status(status: string) {
    this._status = (status && status.trim()) || '<no status set>';
  }

  get status(): string { return this._status; }


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

  private currentValueStatus: string = this._status;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.isStatus();
    this.orderList(this._status);
    this.formData();
  }


  ngOnChanges(changes: SimpleChanges) {
    this.currentValueStatus = changes.status.currentValue;
    this.orderList(this.currentValueStatus);
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

    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      status_order: statusOrder
    };

    console.log('apa', queryParams);

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
    this.router.navigate(['/listing-order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
