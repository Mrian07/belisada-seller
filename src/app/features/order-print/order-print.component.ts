import { ShippingListData } from './../../core/models/transaction/transaction.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TransactionService } from './../../core/services/transaction/transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.scss']
})
export class OrderPrintComponent implements OnInit {
  ListingData: ShippingListData = new ShippingListData();
  img;
  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.img = 'https://api0.belisada.id/belisada/seller/shipping/image?orderNumber=';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.transactionService.getShippingPdf(params['id']).subscribe(respon => {
        this.ListingData = respon.data;
      console.log(respon.data);
      });
      this.img = this.img + params['id'];
      console.log(this.img);
    });
  }

}
