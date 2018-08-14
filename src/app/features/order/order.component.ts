import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: string;
  constructor() {
    this.tabOrder = 'ALL';
  }

  ngOnInit() {
  }

  tab(data) {
    this.tabOrder = data;
  }

}
