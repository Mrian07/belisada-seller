import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  tabOrder: string;
  constructor() { }

  ngOnInit() {
    this.tabOrder = 'tabSemua';
  }

  tab($data) {
    this.tabOrder = $data;
  }

}
