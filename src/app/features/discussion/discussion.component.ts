import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '@belisada-seller/core/services/discussion/discussion.service';

@Component({
  selector: 'bss-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  list: any;
  listChild: any[];
  openDetail: boolean;
  productId: number;
  discusId: number;

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
      this.list = response.content;
    });
  }

  openOS(status, productId, discusId) {
    if (status === true) {
      this.discusId = discusId;
      this.openDetail = false;
    } else {
      this.discusId = discusId;
      this.openDetail = true;

      const queryParams = {
        page: 1,
        itemperpage: 1,
      };
      this.discussionService.getAllDisccusion(productId, queryParams).subscribe(response => {
        console.log('detail: ', response.content);
        this.listChild = response.content[0].childs;
      });

    }



  }

}
