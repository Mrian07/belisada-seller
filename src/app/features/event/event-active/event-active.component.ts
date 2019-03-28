import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-event-active',
  templateUrl: './event-active.component.html',
  styleUrls: ['./event-active.component.scss']
})
export class EventActiveComponent implements OnInit {

  isList: boolean;
  isForm: boolean;

  constructor() { }

  ngOnInit() {
    this.isList = true;
  }

  isFlag() {
    this.isList = false;
    this.isForm = false;
  }

  joinEvent() {
    this.isFlag();
    this.isForm = true;
  }
}
