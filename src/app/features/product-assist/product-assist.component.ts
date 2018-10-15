import { Component, OnInit } from '@angular/core';
import { ComplainService } from '@belisada-seller/core/services/complain/complain.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Content } from '@belisada-seller/core/models';

@Component({
  selector: 'bss-product-assist',
  templateUrl: './product-assist.component.html',
  styleUrls: ['./product-assist.component.scss']
})
export class ProductAssistComponent implements OnInit {
  list: Content[];
  detail: Boolean = false;
  popUpTolak: Boolean = false;
  popUpProses: Boolean = false;
  currentPage: number;
  alasanReject: string;
  createComForm: FormGroup;
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
  }

  loadData() {
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
      // status_order: statusOrder
    };

    this.complainSerive.getComplain(queryParams).subscribe(response => {
      this.list = response.content;
      console.log('hasi sih', response.content);
    });
  }

  formReject() {
      this.createComForm = this.fb.group({
        alasanReject: ['', [Validators.required]]
      });
  }

  viewDetail() {
    this.detail = true;
  }

  btnTolak() {
    this.popUpTolak = true;
  }

  btnProses() {
    this.popUpProses = true;
  }

  cancelTolak() {
    this.popUpTolak = false;
  }

}
