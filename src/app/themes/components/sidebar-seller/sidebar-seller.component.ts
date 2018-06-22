import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'bss-sidebar-seller',
    templateUrl: './sidebar-seller.component.html',
    styleUrls: ['./sidebar-seller.component.scss']
})
export class SidebarSellerComponent implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    storeProfile() {
        this.router.navigateByUrl('/seller/profile-seller');
    }

}
