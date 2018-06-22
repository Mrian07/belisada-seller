import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OnlyLoggedInUsersGuard implements CanActivateChild {
  constructor(private router: Router) { }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini untuk melakukan pengecekan apakah token ada pada local storage,
  jika tidak ada maka user akan dialihkan ke halaman sign in.
  */

  user: any;

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isRemember = localStorage.getItem('isRemember');
    if (isRemember === 'true') {
      this.user = localStorage.getItem('token');
    } else {
      this.user = sessionStorage.getItem('token');
    }

    if (!this.user) {
      this.router.navigateByUrl('/auth/sign-in');
      return false;
    } else {
      return true;
    }
  }
}
