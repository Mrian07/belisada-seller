import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UserData } from '@belisada-seller/core/models';
import { UserService } from '@belisada-seller/core/services';
import { LocalStorageEnum } from '@belisada-seller/core/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // directives: [ClickOutsideDirective],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isSelectBoxActive: Boolean = false;
  userData: UserData = new UserData();
  isLogin: Boolean = false;
  isAccountMenu: Boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('isRemember') === 'true') {
      this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
    } else {
    console.log('userData : ', this.userData);
      if (isPlatformBrowser(this.platformId)) {
        const sess = sessionStorage.getItem(LocalStorageEnum.TOKEN_KEY);
        this.userData = this.userService.getUserData(sess);
      }
    }
    if (this.userData) { this.isLogin = true; }
    console.log('userData : ', this.userData);
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
        if (localStorage.getItem('isRemember') === 'true') {
          localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
        } else {
          sessionStorage.clear();
          localStorage.removeItem('isRemember');
        }
        this.isAccountMenu = false;
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

  toggleAccountMenu() {
    this.isAccountMenu = !this.isAccountMenu;
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.isAccountMenu = false;
    }
  }
  goToProfile() {
    this.router.navigateByUrl('/buyer/profile');
  }

}
