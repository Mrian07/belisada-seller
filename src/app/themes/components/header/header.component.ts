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
  isMessageMenu: Boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserData(localStorage.getItem(LocalStorageEnum.TOKEN_KEY));
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
        localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
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
    this.isMessageMenu = false;
  }

  toggleMessageMenu() {
    this.isMessageMenu = !this.isMessageMenu;
    this.isAccountMenu = false;
  }

  onClickOutside(event: Object) {
    if (event && event['value'] === true) {
      this.isAccountMenu = false;
    }
  }

  onClickOutsideBell(event: Object) {
    if (event && event['value'] === true) {
      this.isMessageMenu = false;
    }
  }

  goToProfile() {
    this.router.navigateByUrl('/buyer/profile');
  }

}
