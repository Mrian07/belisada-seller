import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  template: `
    <bss-auth-layout>
      <router-outlet></router-outlet>
    </bss-auth-layout>`
})
export class AuthComponent implements OnInit {
  href: string;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToSignIn() {
    this.router.navigateByUrl('/account/sign-in');
    location.reload();
    this.href = this.router.url;
  }
  goToSignUp() {
    this.router.navigateByUrl('/account/sign-up');
    location.reload();
    this.href = this.router.url;
  }

}
