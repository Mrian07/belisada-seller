import { Component, OnInit } from '@angular/core';
import { TransactionService } from '@belisada-seller/core/services/transaction/transaction.service';
import { Cart } from '@belisada-seller/core/models';

@Component({
  selector: 'bss-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  listCart: Cart[];
  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.orderList();
  }

  orderList() {
    this.transactionService.getListOrder().subscribe(response => {
      this.listCart = response.cart;
      console.log(this.listCart);
    });
  }

}
