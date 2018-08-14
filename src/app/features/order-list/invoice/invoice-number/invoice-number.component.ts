import { TransactionService } from '@belisada-seller/core/services/transaction/transaction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { InvoiceData, Invoice } from '@belisada-seller/core/models/transaction/transaction.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-invoice-number',
  templateUrl: './invoice-number.component.html',
  styleUrls: ['./invoice-number.component.scss']
})
export class InvoiceNumberComponent implements OnInit {
  // info: Invoice;
  info: InvoiceData = new InvoiceData();
  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.transactionService.getInvoice(params['id']).subscribe(respon => {
        this.info = respon.data;
        console.log('1232132', respon);
      });
    });
  }

}
