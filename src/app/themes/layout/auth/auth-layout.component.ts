import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-auth-layout',
  template: `
    <div class="daddy-container">
      <router-outlet></router-outlet>
    </div>`
})
export class AuthLayoutComponent {

  constructor() { }

}
