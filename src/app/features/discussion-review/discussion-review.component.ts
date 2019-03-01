import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Component({
  selector: 'bss-discussion-review',
  templateUrl: './discussion-review.component.html',
  styleUrls: ['./discussion-review.component.scss']
})
export class DiscussionReviewComponent implements OnInit {
  tabOrder: string;
  keywordSearch;
  showSearch: boolean;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.tabOrder = 'Discussion';
  }

  ngOnInit() {
  }

  tab(data, tabOrder) {
    this.loadingService.show();
    if (tabOrder === data) {
      this.tabOrder = data;
      this.loadingService.hide();
    } else {
      this.loadingService.hide();
      this.router.navigateByUrl('/discussion-review');
      this.tabOrder = data;
    }
  }

  onSearchSubmit() {}
  searchK(event) {}
  onSearchFocusOut() {}

}
