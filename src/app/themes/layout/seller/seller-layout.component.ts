import { Component, OnInit } from '@angular/core';
import { ChatService } from '@belisada-seller/core/services/globals/chat.service';

@Component({
    selector: 'bss-seller-layout',
    templateUrl: './seller-layout.component.html'
})
export class SellerLayoutComponent {

    constructor(
        private _chatService: ChatService
    ) { }

    alertChat() {
        // console.log('storeID:', this.userData.storeId);
        // this.storeId = this.userData.storeId;
        console.log('show:', this._chatService.show());
        this._chatService.show();
    }
}
