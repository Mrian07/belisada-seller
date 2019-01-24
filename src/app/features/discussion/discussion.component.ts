import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '@belisada-seller/core/services/discussion/discussion.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddDisRequest, DisContain, GetDisResponse} from '@belisada-seller/core/models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'bss-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  inputFormGroup: FormGroup[];
  list: DisContain[];
  listChild: DisContain[];
  openDetail: boolean;
  productId: number;
  discusId: number;

  index: number;

  getId: number;
  getParent: number;

  proddetail: GetDisResponse = new GetDisResponse();

  lastPage: number;
  currentPage: number;
  pages: any = [];
  a: any;

  isLoading: boolean;

  constructor(
    public discussionService: DiscussionService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.inputFormGroup = [];
    this.list = [];
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadDis();
    // this.createFormControl();
  }

  createFormControl(datas: DisContain[]) {
    datas.forEach(x => {
      this.inputFormGroup[x.discusId] = this.fb.group({
        discusParentId: ['', Validators.required],
        message: ['', Validators.required],
        productId: ['', Validators.required],
      });

      // this.inputFormGroup[x.discusId].patchValue({
      //   productId: x.productId,
      // });
    });
  }

  loadDis() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
    const queryParams = {
      itemperpage: 10,
      page: this.currentPage,
    };

    this.discussionService.getDiscussion(queryParams).subscribe(response => {
      this.list = response.content;
      this.createFormControl(response.content);
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

  openOS(status, productId, discusId) {
    if (status === true) {
      this.discusId = discusId;
      this.openDetail = false;
    } else {
      this.discusId = discusId;
      this.openDetail = true;

      // const queryParams = {
      //   page: 1,
      //   itemperpage: 1,
      // };

      // this.discussionService.getAllDisccusion(productId, queryParams).subscribe(response => {
      //   this.listChild = response.content;

      //   this.listChild.forEach((content) => {
      //     this.inputFormGroup[content.productId].patchValue({
      //       discusParentId: content.discusId
      //     });
      //   });
      //   // console.log('diskusi all', response.content);
      // });

    }

  }

  onSubmit(item) {
    this.inputFormGroup[item.discusId].patchValue({
      productId: item.productId,
      discusParentId: item.discusId,
    });
    console.log(this.inputFormGroup[item.discusId].value);

    if (this.inputFormGroup[item.discusId].get('message').invalid) {
      swal(
        'Gagal',
        'Message tidak boleh kosong!',
        'warning'
      );
      return;
    }

    this.discussionService.addDiscussion(this.inputFormGroup[item.discusId].value).subscribe(respon => {
      if (respon.status === 1) {
        this.openOS('false', item.productId, item.discusId);
        this.inputFormGroup[item.discusId].patchValue({
          message: '',
        });

        this.loadDis();
      }
    });

  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.proddetail.totalPages) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/discussion-review'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

}
