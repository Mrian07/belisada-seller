import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsSandbox } from '../product/products.sandbox';

@Component({
  selector: 'bss-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder = 'ALL';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.tabOrder = (queryParam.status) ? queryParam.status : 'ALL';
    });
  }

  ngOnInit() {
  }

  tab(data) {
    this.tabOrder = data;
    this.router.navigate(['/listing-order'], { queryParams: {page: 1, status: data}, queryParamsHandling: 'merge' });
  }

}
