import { Component, OnInit } from '@angular/core';
import { StoreService } from '@belisada-seller/core/services';
import {
  UpdateStoreRequest, UpdateDescriptionRequest, ProfileStoreResponse,
  Province, City, District, Village
} from '@belisada-seller/core/models';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { environment } from '@env/environment';

@Component({
  selector: 'bss-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  store: ProfileStoreResponse = new ProfileStoreResponse();
  updateStatus: UpdateStoreRequest = new UpdateStoreRequest();
  updateAddress: UpdateStoreRequest = new UpdateStoreRequest();
  updateDescriptionRequest: UpdateDescriptionRequest = new UpdateDescriptionRequest();
  onViewAddress: Boolean = true;

  baseUrlBuyer: string = environment.baseUrlBuyer;
  provinces: Province[];

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

  /* open|close store */
  changeStatus(el) {
    let msg: string;
    if (this.store.isoffday === false) {
      msg = 'Yakin akan menutup toko';
      this.updateStatus.isoffday = true;
    } else {
      msg = 'Yakin akan membuka toko';
      this.updateStatus.isoffday = false;
    }
    swal({
      title: msg,
      type: 'warning',
      showCancelButton: true,
    }).then((result) => {
      // console.log('stat:', result);
      if (result.value) {
        this.storeService.updateStatus(this.updateStatus).subscribe(rsl => {
          console.log('rsl: ', rsl);
          swal('Success', rsl.message, (rsl.status === 1) ? 'success' : 'error');
          this.getProfile();
        });
      } else {
        el.checked = !el.checked;
      }
    });
  }

  setUpdate(u) {
    console.log('sua:', u);
    if (this.store[u.name] === u.model) {
      this.updateAddress[u.name] = u.model;
    } else {
      delete this.updateAddress[u.name];
    }
  }

  /* address suggestion*/
  getRegion() {
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }

  hideRegionSuggest() {
    setTimeout(() => delete this.provinces, 300);
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
