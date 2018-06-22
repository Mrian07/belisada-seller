import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bss-landing-page',
  template: `
    <bss-seller-layout>
        <router-outlet></router-outlet>
    </bss-seller-layout>
  `
})
export class ProfileComponent {

}
