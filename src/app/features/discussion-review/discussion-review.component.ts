import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bss-discussion-review',
  templateUrl: './discussion-review.component.html',
  styleUrls: ['./discussion-review.component.scss']
})
export class DiscussionReviewComponent implements OnInit {
  tabOrder: string;
  constructor(
    private router: Router
  ) {
    this.tabOrder = 'Discussion';
  }

  ngOnInit() {
  }

  tab(data, tabOrder) {

    if (tabOrder === data) {
      this.tabOrder = data;
    } else {
      this.router.navigateByUrl('/buyer/order');
      this.tabOrder = data;
    }
  }

}
