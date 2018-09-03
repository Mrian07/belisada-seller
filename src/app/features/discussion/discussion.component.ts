import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '@belisada-seller/core/services/discussion/discussion.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddDisRequest, DisContain, GetDisResponse} from '@belisada-seller/core/models';

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

  constructor(
    public discussionService: DiscussionService,
    private fb: FormBuilder,
  ) {
    this.inputFormGroup = [];
  }

  ngOnInit() {
    this.loadData();
    // this.createFormControl();
  }

  createFormControl(datas: DisContain[]) {
    datas.forEach(x => {
      this.inputFormGroup[x.productId] = this.fb.group({
        discusParentId: ['', Validators.required],
        message: ['', Validators.required],
        productId: ['', Validators.required],
      });

      this.inputFormGroup[x.productId].patchValue({
        productId: x.productId,
      });
    });
  }

  loadData() {
    const queryParams = {
      page: 1,
      itemperpage: 1,
    };
    this.discussionService.getDiscussion(queryParams).subscribe(response => {
      this.list = response.content;
      this.createFormControl(response.content);
      // console.log('diskusi biasa', response.content);
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
        this.listChild = response.content;
        this.listChild.forEach((content) => {
          this.inputFormGroup[content.productId].patchValue({
            discusParentId: content.discusId
          });
        });
        // console.log('diskusi all', response.content);
      });

    }

  }

  onSubmit(productId) {
    const form = this.inputFormGroup[productId];
    if (form.valid) {
      const addDisRequest: AddDisRequest = form.value;
      addDisRequest.discusParentId = this.inputFormGroup[productId].controls['discusParentId'].value;
      addDisRequest.message = this.inputFormGroup[productId].controls['message'].value;
      addDisRequest.productId = this.inputFormGroup[productId].controls['productId'].value;
      this.getId = this.inputFormGroup[productId].controls['productId'].value;
      this.getParent = this.inputFormGroup[productId].controls['discusParentId'].value;
      // console.log('masuk', addDisRequest);

      this.discussionService.addDiscussion(addDisRequest).subscribe(respon => {
        console.log('hasilnya', respon);
        if (respon.status === 1) {
          this.openOS('false', this.getId, this.getParent);
          this.inputFormGroup[this.getId].patchValue({
            message: '',
          });
        }
      });

    }
  }
}
