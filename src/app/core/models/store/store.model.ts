import { BaseResponseModel } from '@belisada-seller/core/models';

export class CreateStoreRequest {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class CreateStoreResponse extends BaseResponseModel {

}

export class CheckStoreRequest {
  name: string;
}

export class CheckStoreResponse extends BaseResponseModel {

}

export class DetailStoreRequest {
  id: string;
}

class DetailStoreData {
  name: string;
  address: string;
  description?: string;
  picture?: string;
}

export class DetailStoreResponse {
  status: number;
  message?: string;
  data?: DetailStoreData;
}

export class ProfileStoreResponse {
  storeId: number;
  name: string;
  statusCode: any;
  storeUrl: any;
  phone: number;
  email: string;
  address: string;
  addressId: number;
  description: string;
  rating: number;
  villageId: number;
  villageName: string;
  districtId: number;
  districtName: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  postal: number;
  mUserLocationId: number;
  isoffday: boolean;
  imageStoreUrl: any;
  url: string;
}
export class UpdateStoreRequest {
  phone: number;
  email: string;
  address: string;
  villageId: number;
  description?: string;
  picture?: string;
  isoffday: boolean;
}

export class UpdateDescriptionRequest {
  description: string;
  imageStoreUrl: string;
}

export class UpdateStoreResponse extends BaseResponseModel {
  data: DetailStoreData;
}

export class OpenStoreResponse extends BaseResponseModel {

}
