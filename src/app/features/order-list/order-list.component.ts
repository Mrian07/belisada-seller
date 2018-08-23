import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TransactionService } from '@belisada-seller/core/services/transaction/transaction.service';
import { Cart } from '@belisada-seller/core/models';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
@Component({
  selector: 'bss-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnChanges {

  // @Input() status: string;

  private _status = '';

  @Input()
  set status(status: string) {
    this._status = (status && status.trim()) || '<no status set>';
  }

  get status(): string { return this._status; }

  listCart: Cart[];
  btnResi: any;
  
  private currentValueStatus: string = this._status;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderList(this._status);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentValueStatus = changes.status.currentValue;
    this.orderList(this.currentValueStatus);
  }
  goToInvoice(e) {
    window.open(environment.baseUrlSeller + '/invoice-number/' + e, '_blank');
  }

  orderList(statusOrder?: string) {
    const queryParams = {
      itemperpage: 10,
      page: 1,
      status_order: statusOrder
    };

    this.transactionService.getListOrder(queryParams).subscribe(response => {
      this.listCart = response.content;
      console.log(this.listCart);
    });
  }

}
