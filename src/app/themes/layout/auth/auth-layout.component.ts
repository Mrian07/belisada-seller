import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bss-auth-layout',
  template: `
    <div class="daddy-container">
      <div class="container has-footer">

      <div class="row">
          <div class="col-12">
              <a href="{{ baseUrl }}"><img src="assets/img/logo.png" width="300"></a>
          </div>
          <!-- <div class="col-5">
              <div class="backHome" (click)="goHome()"><fa-icon [icon]="['fas', 'arrow-left']"></fa-icon> Back To Home</div>
          </div> -->
      </div>
      <div class="row">
          <div class="col-7">
              <div class="img-store"><img src="assets/img/store_image.png">
                <p>Buka Toko dan Jual Produkmu secara mudah di Belisada.co.id</p>
              </div>
          </div>
          <div class="col-5">
            <router-outlet></router-outlet>
          </div>
          </div>
      </div>

      <app-footer></app-footer>
    </div>`
})
export class AuthLayoutComponent {

  constructor() { }

}
