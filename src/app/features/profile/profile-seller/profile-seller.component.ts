import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {
  UpdateStoreRequest, UpdateDescriptionRequest, ProfileStoreResponse,
  Province, City, District, Village
} from '@belisada-seller/core/models';
import { StoreService } from '@belisada-seller/core/services';

@Component({
  selector: 'app-profile-seller',
  templateUrl: './profile-seller.component.html',
  styleUrls: ['./profile-seller.component.scss']
})
export class ProfileSellerComponent implements OnInit {

  userImgAvatar: string;
  onViewAddress: Boolean = true;
  onViewDesc: Boolean = true;
  store: ProfileStoreResponse = new ProfileStoreResponse();
  updateAddress: UpdateStoreRequest = new UpdateStoreRequest();
  updateDesc: UpdateStoreRequest = new UpdateStoreRequest();
  updateStatus: UpdateStoreRequest = new UpdateStoreRequest();
  updateDescriptionRequest: UpdateDescriptionRequest = new UpdateDescriptionRequest();
  provinces: Province[];
  serverMessage: String;
  cities: City[];
  districts: District[];
  villages: Village[];
  updateImg: Boolean = false;
  base64Img: string;

  fm: any = {};

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.storeService.profile().subscribe(data => {
      this.store = data;
      this.updateDescriptionRequest.description = data.description;
      this.updateDescriptionRequest.imageStoreUrl = data.imageStoreUrl;
      console.log('test', data);
      this.userImgAvatar = data.imageStoreUrl ? data.imageStoreUrl : '/assets/img/store_profile.png';
    });
  }

  /* address suggestion*/
  getRegion() {
    this.storeService.getProvince('209').subscribe(data => {
      this.provinces = data;
    });
  }
  setRegion(o) {
    this.store.regionName = o.regionName;
    this.store.regionId = o.regionId;
    delete this.store.cityName;
  }
  hideRegionSuggest() {
    setTimeout(() => delete this.provinces, 300);
  }

  getCity() {
    this.storeService.getCity(this.store.regionId).subscribe(data => {
      this.cities = data;
    });
  }
  setCity(o) {
    this.store.cityName = o.cityName;
    this.store.cityId = o.cityId;
    delete this.store.districtName;
  }
  hideCitySuggest() {
    setTimeout(() => delete this.cities, 300);
  }

  getDistrict() {
    this.storeService.getDistrict(this.store.cityId).subscribe(data => {
      this.districts = data;
    });
  }
  setDistrict(o) {
    this.store.districtName = o.districtName;
    this.store.districtId = o.districtId;
    delete this.store.villageName;
  }
  hideDistrictSuggest() {
    setTimeout(() => delete this.districts, 300);
  }

  getVillage() {
    this.storeService.getVillage(this.store.districtId).subscribe(data => {
      this.villages = data;
    });
  }
  setVillage(o) {
    this.store.villageName = o.villageName;
    this.store.villageId = o.villageId;
  }
  hideVillageSuggest() {
    setTimeout(() => delete this.villages, 300);
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
          if (rsl.status !== 1) {
            swal(rsl.message);
          }
        });
      } else {
        el.checked = !el.checked;
      }
    });
  }

  /* editing store address */
  editAddress() {
    this.onViewAddress = false;
  }
  saveAddress(form: NgForm) {
    console.log('form: ', form);
    const data: UpdateStoreRequest = new UpdateStoreRequest();
    data.address = this.store.address;
    data.villageId = this.store.villageId;

    if (Object.keys(data).length !== 2) {
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
  setUpdate(u) {
    console.log('sua:', u);
    if (this.store[u.name] === u.model) {
      this.updateAddress[u.name] = u.model;
    } else {
      delete this.updateAddress[u.name];
    }
  }
  needUpdate() {
    return Object.keys(this.updateAddress).length > 0 ? true : false;
  }

  /* editing store detail */
  editDesc() {
    this.onViewDesc = false;
  }
  // setUpdateDesc(el) {
  //   if (this.store.description === el.model) {
  //     delete this.updateDesc[el.name];
  //   } else {
  //     this.updateDesc[el.name] = el.model;
  //   }
  // }
  // saveDesc(fm) {
    saveDesc() {

    const data: UpdateDescriptionRequest = new UpdateDescriptionRequest();
    data.description = this.store.description;
    data.imageStoreUrl = this.base64Img;

    // this.storeService.updateDesc(data).subscribe(rsl => {
    this.storeService.updateDesc(data).subscribe(rsl => {

      if (rsl.status === 1) {
        this.onViewDesc = true;
        // this.updateDesc = new UpdateStoreRequest();
        swal(rsl.message);
      } else {
        swal(rsl.message);
      }
    });
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    // this.onViewDesc = false;
    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      that.base64Img = fr.result;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}
