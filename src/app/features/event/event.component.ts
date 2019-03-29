import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  tabPage: string;
  constructor() { }

  ngOnInit() {
    this.tabPage = 'ActiveEvent';
  }

  tab(data, tabPage) {
    if (tabPage === data) {
      this.tabPage = data;
    } else {
      this.tabPage = data;
    }
  }

}
