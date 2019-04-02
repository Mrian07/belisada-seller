import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-event',
  template: `
    <bss-seller-layout>halloo
      <router-outlet></router-outlet>
    </bss-seller-layout>`
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
