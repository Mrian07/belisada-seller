import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'bss-auth-layout',
    template: `<router-outlet></router-outlet>`
})
export class AuthLayoutComponent {
    baseUrl = environment.baseUrlSeller;
    constructor() { }
}
