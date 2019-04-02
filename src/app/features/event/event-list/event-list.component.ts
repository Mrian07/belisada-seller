import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bss-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  isList: boolean;
  isForm: boolean;
  tabPage: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isList = true;
  }

  isFlag() {
    this.isList = false;
    this.isForm = false;
  }

  joinEvent() {
    this.router.navigate(['/event/join']);
  }

}
