import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-product-assist',
  templateUrl: './product-assist.component.html',
  styleUrls: ['./product-assist.component.scss']
})
export class ProductAssistComponent implements OnInit {
  detail: Boolean = false;
  popUpTolak: Boolean = false;
  popUpProses: Boolean = false;
  constructor() { }

  ngOnInit() {
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
