import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { SubscribeRequest } from '@belisada-seller/core/models';
import { SubscribeService } from '@belisada-seller/core/services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  subscribe_email: FormControl;
  subscribeRequest: SubscribeRequest = new SubscribeRequest();

  constructor(private onSubs: SubscribeService) {}

  ngOnInit() {
    this.subscribe_email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
    ]);
  }

  /* Fungsi ini untuk mendaftarkan email dengan dilakukan validasi email terlebih dulu apakah sudah terdaftar atau belum. */
  subscribe() {
    if (!this.subscribe_email.invalid) {
    this.subscribeRequest.email = this.subscribe_email.value;
    this.onSubs.newsLetter(this.subscribeRequest)
      .subscribe(data => {
        swal(data.message);
        if (data.status === 1) {
          this.subscribe_email.reset();
        }
      },
      error => {
        swal('Ops, try again later');
      });
    }
  }

}
