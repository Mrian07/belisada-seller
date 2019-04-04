import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'bss-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.scss']
})
export class EventTabComponent implements OnInit {

  type: string;
  tabPage: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.type = (params['type'] === undefined) ? 'list' : params['type'];
      this.tabPage = this.type;
    });

  }

  ngOnInit() {

  }

  tab(data) {
    this.router.navigate(['/event/tab'],  {queryParams: {type: data}});
  }

}
