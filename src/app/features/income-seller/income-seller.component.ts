import { Component, OnInit } from '@angular/core';

import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormArray } from '@angular/forms';
import { DateFormatEnum } from '@belisada-seller/core/enum';
import { IncomeServiceService } from '@belisada-seller/core/services';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContentData } from '@belisada-seller/core/models';
import { DateUtil } from '@belisada-seller/core/util';

import swal from 'sweetalert2';

import { ResponseWithdrawal} from '@belisada-seller/core/models';
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Component({
  selector: 'bss-income-seller',
  templateUrl: './income-seller.component.html',
  styleUrls: ['./income-seller.component.scss']
})
export class IncomeSellerComponent implements OnInit {
  tabOrder: string;
  constructor(private incomeS: IncomeServiceService, private router: Router) {}

  ngOnInit() {
    this.tabOrder = 'MyIncome';
  }

  tab(data, tabOrder) {
    if (tabOrder === data) {
      this.tabOrder = data;
    } else {
      this.router.navigateByUrl('/Income');
      this.tabOrder = data;
    }
  }
}
