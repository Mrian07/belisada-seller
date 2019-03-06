import { Component, OnInit, OnDestroy  } from '@angular/core';
import { TransactionService } from '@belisada-seller/core/services/transaction/transaction.service';
import { Cart, Resi, ListOrderSellerResponse, InvoiceData, AddReason } from '@belisada-seller/core/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { InvoiceData } from '@belisada-seller/core/models/transaction/transaction.model';
import mct from 'madrick-countdown-timer';
import swal from 'sweetalert2';
import { environment } from '@env/environment';
import { ReasonService } from '@belisada-seller/core/services';
import { LoadingService } from '@belisada-seller/core/services/global/loading.service';
import { ShareMessageService } from '@belisada-seller/core/services/share-message/share-message.service';
@Component({
  selector: 'bss-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  thumborUrl: string = environment.thumborUrl;
  disabled: Boolean = false;
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: 0,
    message: ''
};

  info: InvoiceData = new InvoiceData();

  cancelOrderModal: boolean;

  // @Input() status: string;
  visible: boolean;
  status = 'ALL';
  toggleArrBol: boolean[];
  listCart: Cart[];
  btnResi: boolean;
  btnChoose: string;
  createComForm: FormGroup;
  cancelForm: FormGroup;
  actualCourierPrice: number;
  noResi: string;
  orderNumber: string;
  isForm: Boolean = false;
  isProsesResi: Boolean = false;
  isErrorResi: Boolean = false;
  proddetail: ListOrderSellerResponse = new ListOrderSellerResponse();
  submitted: Boolean = false;
  formSubmited: Boolean = false;
  lastPage: number;
  currentPage: number;
  pages: any = [];
  a: any;
  b: any;
  date = '09/22/2018 16:29:39';
  x;
  c;
  get form() { return this.createComForm.controls; }

  constructor(
    private transactionService: TransactionService,
    private reasonService: ReasonService,
    private loadingService: LoadingService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private shareMessageService: ShareMessageService
  ) {
    this.toggleArrBol = [];
    this.cancelOrderModal = false;
  }

  ngOnInit() {
    this.isStatus();
    this.formData();
    this.cancelData();
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      // this.status = (queryParam.status) ? queryParam.status : 'ALL';
      // this.orderList((queryParam.status) ? queryParam.status : 'ALL');
      this.status = (queryParam.status) ? queryParam.status : 187;
      this.orderList((queryParam.status) ? queryParam.status : 187);
    });
  }

  goToInvoice(e) {
    window.open(environment.baseUrlSeller + '/invoice-number/' + e, '_blank');
  }
  gotoCetakLabelPengiriman(e) {
    window.open(environment.baseUrlSeller + '/print-order/' + e, '_blank');
    // window.open(environment.apiUrl + '/seller/shippingpdf?orderNumber=' + e, '_blank');
  }

  private formData() {
    this.createComForm = this.fb.group({

      actualCourierPrice: [''],
      orderNumber: ['', [Validators.required]],
      noResi: ['', [Validators.required]]
    });
  }

  orderList(statusOrder?: string) {
    this.loadingService.show();
    this.shareMessageService.changeMessage('reload-sidebar');
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      status_order: statusOrder
    };

    this.transactionService.getListOrder(queryParams).subscribe(response => {
      this.loadingService.hide();
      const a = response.content.findIndex(x => x.expiredSellerProcessDate !== '');
      const b =  response.content.filter(x => x.expiredSellerProcessDate !== '');
      // console.log(b);
      response.content.forEach((item, index) => {
        this.toggleArrBol.push(false);
      });
      this.listCart = response.content;
      if ( this.listCart.length === 0) {
      } if (this.listCart.length >= 0) {
        b.forEach((x) => {
          mct.countdown(x.expiredSellerProcessDate, (countdown) => {
            if (this.listCart.length > 0) {
              this.listCart.find(i => i.invoiceNumber === x.invoiceNumber).countdown = countdown;
            }
            // this.countdown = countdown;
          });
        });
      }
      console.log('as', this.listCart);
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
    this.orderNumber = orderNumber;
    this.transactionService.getInvoice(orderNumber).subscribe(respon => {
      this.info = respon.data;
      this.createComForm.patchValue({
        orderNumber : orderNumber,
        actualCourierPrice: this.info.actualCourierPrice,
        noResi: this.info.noResi
      });
      this.disableControl((this.info.noResi !== '') ? true : false);
    });

  }

  isStatus() {
    this.isForm = false;
    this.isProsesResi = false;
    this.isErrorResi = false;
  }

  prosesResi() {

    this.submitted = true;
    if (this.createComForm.valid) {
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
          this.orderList(this.status);
        }

      });
    } else {
      console.log('xxxx');
    }

  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/listing-order'], { queryParams: {page: page, status: this.status}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  disableControl(condition: Boolean) {
    this.disabled = condition;
    const action = condition ? 'disable' : 'enable';
    this.createComForm.controls['actualCourierPrice'][action]();
    this.createComForm.controls['noResi'][action]();
  }

  ngOnDestroy() {
  //  this.ngOnInit();
  this.orderList();
  }

  acceptTransaction(orderNumber) {
    swal({
      title: 'belisada.co.id',
      text: 'Anda yakin akan menerima pesanan?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swal(
          'Success!',
          'Anda telah menerima pesanan. Silahkan segera proses pesanan Anda',
          'success'
        ).then(() => {
          this.transactionService.acceptTransaction(orderNumber).subscribe(response => {
            this.orderList(this.status);
          });
        });
      }
    });
  }

  back() {
    this.cancelOrderModal = false;
  }

  declineTransactionModal(orderNumber) {
    this.cancelOrderModal = true;
    this.orderNumber = orderNumber;
  }

  private cancelData() {
    this.cancelForm = this.fb.group({
      orderNumber: ['', [Validators.required]],
      reason: ['', [Validators.required]]
    });
  }

  onSubmit(orderNumber) {
    this.cancelForm.patchValue({
      orderNumber: orderNumber
    });
    const _data: AddReason = new AddReason();
    _data.orderNumber = this.cancelForm.controls['orderNumber'].value;
    _data.reason = this.cancelForm.controls['reason'].value;
      swal({
        title: 'belisada.co.id',
        text: 'Anda yakin akan menolak pesanan?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iya',
        cancelButtonText: 'Tidak',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swal(
            'Success!',
            'Anda telah menolak pesanan.',
            'success'
          ).then(() => {
            this.reasonService.addReason(_data).subscribe(response => {
              console.log(response);
              this.loadingService.hide();
              this.orderList(this.status);
            });
            });
            }
    });
    this.cancelForm.reset();
    this.cancelOrderModal = false;
}

}
