import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'bss-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
    baseUrl = environment.baseUrlSeller;
    constructor() { }
}
