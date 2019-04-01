import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bss-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.scss']
})
export class EventTabComponent implements OnInit {

  type: any;
  tabPage: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    const type = this.router.url.split('/');
    const type2 = type[2].split('?');

    if (type2[0] === 'myevent') {
      this.tabPage = 'myevent';
    } else if (type2[0] === 'list') {
      this.tabPage = 'list';
    }

    console.log('pagenya', this.tabPage);
  }

  ngOnInit() {
    // this.tabPage = 'list';
  }

  tab(data, tabPage) {

    if (tabPage === data) {
      this.tabPage = data;
    } else {
      this.tabPage = data;
    }

    if (data === 'myevent') {
      // this.router.navigate(['/event']);
      console.log(this.router.navigate(['/event', 'myevent']));
    } else {
      if (data === 'list') {
        this.router.navigate(['/event/list']);
        // this.router.navigate(['/event', 'list']);
      }
    }
  }

}
