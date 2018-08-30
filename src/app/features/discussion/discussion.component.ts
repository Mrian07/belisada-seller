import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '@belisada-seller/core/services/discussion/discussion.service';

@Component({
  selector: 'bss-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  list: any;

  constructor(
    public discussionService: DiscussionService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const queryParams = {
      page: 1,
      itemperpage: 1,
    };
    this.discussionService.getDiscussion(queryParams).subscribe(response => {
      console.log(response.content);
      this.list = response.content;
    });
  }

}
