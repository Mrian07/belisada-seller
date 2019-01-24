import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@belisada-seller/core/services/review/review.service';
import { GetRevResponse, ContainRev, ContainRevList} from '@belisada-seller/core/models/';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'bss-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  list: ContainRev[];
  listChild: ContainRevList[];
  openDetail: boolean;
  productId: number;
  reviewId: number;

  index: number;

  getId: number;
  getParent: number;

  proddetail: GetRevResponse = new GetRevResponse();

  lastPage: number;
  currentPage: number;
  pages: any = [];
  a: any;

  isLoading: boolean;

  public Arr = Array;

  constructor(
    public reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadRev();
  }

  loadRev() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
    };

    this.reviewService.getReview(queryParams).subscribe(response => {
      this.list = response.content;
      this.proddetail = response;
      this.a = response.totalElements;
      this.pages = [];
      this.lastPage = this.proddetail.totalPages;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.proddetail.totalPages) {
          this.pages.push(r);
        }
      }

    });
  });
  }

  openOS(status, productId) {
    if (status === true) {
      this.productId = productId;
      this.openDetail = false;
    } else {
      this.productId = productId;
      this.openDetail = true;

      const queryParams = {
        page: 1,
        itemperpage: 10,
      };

      this.reviewService.getAllReview(productId, queryParams).subscribe(response => {
        this.listChild = response.content;
        });

    }

  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/discussion-review'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
