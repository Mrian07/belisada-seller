import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-discussion-review',
  templateUrl: './discussion-review.component.html',
  styleUrls: ['./discussion-review.component.scss']
})
export class DiscussionReviewComponent implements OnInit {
  tabOrder: string;
  constructor() {
    this.tabOrder = 'Discussion';
  }

  ngOnInit() {
  }

  tab(data) {
    this.tabOrder = data;
  }

}
