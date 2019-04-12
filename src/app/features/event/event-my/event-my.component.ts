import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bss-event-my',
  templateUrl: './event-my.component.html',
  styleUrls: ['./event-my.component.scss']
})
export class EventMyComponent implements OnInit {

  isList: boolean;
  isForm: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isList = true;
  }

  isFlag() {
    this.isList = false;
    this.isForm = false;
  }

  viewEvent() {
    this.router.navigate(['/event/view']);
  }

}
