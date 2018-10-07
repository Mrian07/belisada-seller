import { Component, OnInit } from '@angular/core';
import { StoreService } from '@belisada-seller/core/services';
import {
  UpdateStoreRequest, UpdateDescriptionRequest, ProfileStoreResponse,
  Province, City, District, Village
} from '@belisada-seller/core/models';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'bss-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  store: ProfileStoreResponse = new ProfileStoreResponse();
  updateStatus: UpdateStoreRequest = new UpdateStoreRequest();
  updateDescriptionRequest: UpdateDescriptionRequest = new UpdateDescriptionRequest();
  onViewAddress: Boolean = true;

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.storeService.profile().subscribe(data => {
      this.store = data;
      this.updateDescriptionRequest.description = data.description;
      this.updateDescriptionRequest.imageStoreUrl = data.imageStoreUrl;
    });
  }

  editAddress() {
    this.onViewAddress = false;
  }

  saveAddress(form: NgForm) {
    console.log('form: ', form);
    const data: UpdateStoreRequest = new UpdateStoreRequest();
    data.email = this.store.email;
    data.phone = this.store.phone;
    data.address = this.store.address;
    data.villageId = this.store.villageId;

    if (this.store.address === '') {
      return swal('Pastikan alamat disi dengan benar');
    }
    this.storeService.updateAddress(data).subscribe(rsl => {
      if (rsl.status === 1) {
        form.reset();
        this.onViewAddress = true;
        setTimeout(() => {
          Object.assign(this.store, rsl.data);
        }, 100);
      } else {
        swal(rsl.message);
      }
    });
  }
}
