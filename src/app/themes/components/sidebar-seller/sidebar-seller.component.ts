import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { LocalStorageEnum } from '@belisada-seller/core/enum';

import {
  TransactionService
} from '@belisada-seller/core/services';

@Component({
    selector: 'bss-sidebar-seller',
    templateUrl: './sidebar-seller.component.html',
    styleUrls: ['./sidebar-seller.component.scss']
})
export class SidebarSellerComponent implements OnInit {

  countVal: any;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.countOrder();
  }

  countOrder() {
    this.transactionService.orderCount().subscribe(response => {
      this.countVal = response;
    });
  }
  storeProfile() {
    this.router.navigateByUrl('/seller/profile-seller');
  }

  logout() {
    swal({
      title: 'belisada.co.id',
      text: 'Anda yakin akan logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
        swal(
          'Success!',
          'Anda sudah keluar dari Account Area.',
          'success'
        ).then(() => {
          this.router.navigateByUrl('/');
          location.reload();
        });
      }
    });
  }

}
