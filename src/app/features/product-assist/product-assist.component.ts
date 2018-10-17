import { Component, OnInit } from '@angular/core';
import { ComplainService } from '@belisada-seller/core/services/complain/complain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Content, ComplaintPDC, Accept, Reject } from '@belisada-seller/core/models';
import swal from 'sweetalert2';

@Component({
  selector: 'bss-product-assist',
  templateUrl: './product-assist.component.html',
  styleUrls: ['./product-assist.component.scss']
})
export class ProductAssistComponent implements OnInit {
  list: Content[];
  listPDC: ComplaintPDC[];
  detail: Boolean = false;
  popUpTolak: Boolean = false;
  popUpProses: Boolean = false;
  currentPage: number;
  alasanReject: string;
  rejectForm: FormGroup;
  acceptForm: FormGroup;
  orderNumber: number;

  constructor(
    private complainSerive: ComplainService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      // this.status = (queryParam.status) ? queryParam.status : 'ALL';
      // this.orderList((queryParam.status) ? queryParam.status : 'ALL');
    });
    this.loadData();
    this.loadPDC();
    this.formReject();
    this.formAccept();
  }

  loadPDC() {
    const queryParams = {
      code: 'PDC'
    };

    this.complainSerive.getPDC(queryParams).subscribe(response => {
      this.listPDC = response;
    });
  }

  loadData() {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      // status_order: statusOrder
    };

    this.complainSerive.getComplain(queryParams).subscribe(response => {
      this.list = response.content;
    });
  }

  formReject() {
      this.rejectForm = this.fb.group({
        orderNumber: ['', [Validators.required]],
        rejectReason: ['', [Validators.required]],
      });
  }

  formAccept() {
    this.acceptForm = this.fb.group({
      orderNumber: ['', [Validators.required]],
      complainAcceptCode: ['', [Validators.required]],
    });
  }

  submitReject() {
    if (this.rejectForm.controls['rejectReason'].value === '') {
      swal(
        'Peringatan',
        'Silakan masukan alasan penolakan',
        'warning'
      );
      return;
    }
    this.popUpTolak = false;
      const rejectData: Reject = new Reject();
      rejectData.orderNumber = this.rejectForm.controls['orderNumber'].value;
      rejectData.rejectReason = this.rejectForm.controls['rejectReason'].value;

      this.complainSerive.rejectComplain(rejectData).subscribe(response => {
        console.log('respon', response);
        this.popUpTolak = false;

        if (response.status === 1) {
          swal(
            'Peringatan',
            'Tolak komplain berhasil dilakukan',
            'success'
          );
        } else {
          swal(
            'Peringatan',
            'Tolak komplain gagal dilakukan',
            'warning'
          );
        }
      });
  }

  submitAccept() {

    if (this.acceptForm.controls['complainAcceptCode'].value === '') {
      swal(
        'Peringatan',
        'Silakan pilih opsi pengembalian dana',
        'warning'
      );
      return;
    }
    this.popUpProses = false;
    const acceptData: Accept = new Accept();
      acceptData.orderNumber = this.acceptForm.controls['orderNumber'].value;
      acceptData.complainAcceptCode = this.acceptForm.controls['complainAcceptCode'].value;
      this.complainSerive.acceptComplain(acceptData).subscribe(response => {
        console.log('respon', response);
        this.popUpTolak = false;
        if (response.status === 1) {
          swal(
            'Peringatan',
            'Proses komplain berhasil dilakukan',
            'success'
          );
        } else {
          swal(
            'Peringatan',
            'Proses komplain gagal dilakukan',
            'warning'
          );
        }
      });
  }

  viewDetail(status, orderNumber) {
    this.detail = true;
      if (status === true) {
        this.orderNumber = orderNumber;
        this.detail = false;
      } else {
        this.orderNumber = orderNumber;
        this.detail = true;
      }
  }

  btnTolak(orderNumber) {
    this.popUpTolak = true;
    this.rejectForm.patchValue(
      {
        orderNumber: orderNumber,
      });
  }

  btnProses(orderNumber) {
    this.popUpProses = true;
    this.acceptForm.patchValue(
      {
        orderNumber: orderNumber,
      });
  }

  cancelTolak() {
    this.popUpTolak = false;
  }

}
