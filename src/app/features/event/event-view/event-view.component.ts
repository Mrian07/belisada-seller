import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bss-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backEvent() {
    this.router.navigate(['/event/myevent']);
  }
}
