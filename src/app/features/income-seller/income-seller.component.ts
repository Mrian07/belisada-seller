import { Component, OnInit } from '@angular/core';

import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormArray } from '@angular/forms';
import { DateFormatEnum } from '@belisada-seller/core/enum';
import { IncomeServiceService } from '@belisada-seller/core/services';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContentData } from '@belisada-seller/core/models';
import { DateUtil } from '@belisada-seller/core/util';
@Component({
  selector: 'bss-income-seller',
  templateUrl: './income-seller.component.html',
  styleUrls: ['./income-seller.component.scss']
})
export class IncomeSellerComponent implements OnInit {
  now: Date = new Date();
  defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;
  names: any;
  lastPage: number;
  currentPage: number;
  public fGroup: FormGroup;
  pages: any = [];
  myForm: FormGroup;
  getData: ContentData[];
  getTotal: any;
  invNum: any;
  invNumPart2: any = [];
  selectedAll: any;
  xx: false;
  myDatePickerOptions: IMyDpOptions = {
    // other options... https://github.com/kekeh/mydatepicker#options-attribute
    dateFormat: this.defaultDateFormat,
    todayBtnTxt: 'Today',
    editableDateField: false,
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    maxYear: this.now.getFullYear() - 12,
    minYear: this.now.getFullYear() - 90,
    disableSince: {
      year: this.now.getFullYear(),
      month: this.now.getMonth() + 1,
      day: this.now.getDate() + 1
    }
  };
  constructor(private incomeS: IncomeServiceService, private router: Router,
    private fb: FormBuilder,

    private dateUtil: DateUtil,
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    
    this.form();
    this.newMethod();
  }
  private newMethod() {
    this.incomeS.getTotal().subscribe(res => {
      this.getTotal = res.data;
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
      };
      this.incomeS.getIncomeWithDate(queryParams).subscribe(response => {
        this.getData = response.content;
        this.lastPage = response.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.lastPage) {
            this.pages.push(r);
          }
        }
        console.log(response);
        for (let i = 0; i < this.getData.length; i++) {
          this.getData[i].selected = this.xx;
          console.log('this.selectedAll', this.getData[i].status);
        }
        console.log(response.content);
      });
    });
  }

  private form() {
    this.myForm = this.fb.group({
      useremail: this.fb.array([], Validators.required),
      tulisan: new FormControl,
    });
    this.fGroup = this.fb.group({
      date1: new FormControl(null, Validators.required),
      date2: new FormControl(null, Validators.required),
    });
  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/listing-product'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }


  selectAll() {
    for (let i = 0; i < this.getData.length; i++) {
      this.getData[i].selected = true;
      this.invNumPart2.push(this.getData[i].invoiceNumber);
    //  const a = JSON.stringify(this.invNumPart2);
      // console.log(a)
      console.log(  this.invNumPart2);
      // console.log('res',response);
    }
    // console.log( this.getData);
  }
  asd(e) {
    console.log('asdasd', e);
  }
  testing() {
    // console.log(editProfileRequest);
    if (this.fGroup.valid) {
      const model = this.fGroup.value;
      const editProfileRequest: ContentData = new ContentData();
      const datestart = editProfileRequest.datestart =
      this.dateUtil.formatMyDate(this.fGroup.controls['date1'].value.date, this.defaultDateFormat);
     const dateend =  editProfileRequest.dateend =
      this.dateUtil.formatMyDate(this.fGroup.controls['date2'].value.date, this.defaultDateFormat);
      console.log(editProfileRequest);
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.pages = [];
        this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
        const queryParams = {
          page: this.currentPage,
          itemperpage: 10,
          datestart: datestart,
          dateend: dateend
        };
        this.incomeS.getIncomeWithDate(queryParams).subscribe(response => {
          this.getData = response.content;
          console.log(response.content);
          });
      });
    } else {
      console.log('b')
    }
                

  }
  onChange(email: any, isChecked: boolean) {
    const emailFormArray = < FormArray > this.myForm.controls.useremail;
    
    if (isChecked) {
      emailFormArray.push(new FormControl(email));
      // console.log(emailFormArray.value);
  //  console.log(email);
  this.invNum = email;

 } else {
   const index = emailFormArray.controls.findIndex(x => x.value == email);
   emailFormArray.removeAt(index);
  //  console.log(email);

  }
}

tarikDana() {
  if ( this.myForm.valid ) {
    const a = {
    invoiceNumber: this.myForm.get('useremail').value,
  };
  console.log(a);
  const queryParams = {
    page: this.currentPage,
    itemperpage: 10,
  };
  this.incomeS.postIncome(a).subscribe(response => {
    this.incomeS.getIncomeWithDate(queryParams).subscribe(x => {
      this.getData = x.content;
      });
    });
  } else {
    const a = {
    invoiceNumber: this.invNumPart2
  };
  console.log(a);
  const queryParams = {
    page: this.currentPage,
    itemperpage: 10,
  };
  this.incomeS.postIncome(a).subscribe(response => {
    this.incomeS.getIncomeWithDate(queryParams).subscribe(x => {
      this.getData = x.content;
      });
    });
    console.log('invNumPart2', this.invNumPart2)
  }
}

}
