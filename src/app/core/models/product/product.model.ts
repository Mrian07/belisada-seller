import { PriceAndStock, Delivery, Courier } from '@belisada-seller/core/models';

export class Product {
  pictures: string[] = [];
  name: string;
  brand: string;
  category: string;
  description: string;
  specs: any[];
  priceandstock: PriceAndStock;
  delivery: Delivery;
}

export class AddProductRequest {
  brandId: number;
  brandName: string;
  categoryThreeId: number;
  classification: string;
  couriers: any[];
  description: string;
  descriptionEn: string;
  dimensionsWidth: number;
  dimensionsheight: number;
  dimensionslength: number;
  guaranteeTime: string;
  guaranteeType: string;
  highlight: string;
  highlightEn: string;
  imageUrl: string[];
  isGuarantee: boolean;
  name: string;
  nameEn: string;
  pricelist: number;
  specialPrice: number;
  discount: number;
  qty: number;
  specification: ProductSpecification[];
  volume: number;
  weight: number;
}

export class AddProductResponse {
  status: number;
  message: string;
}

export class ProductCourier {
  code: string;
  courierId: number;
  isUse: boolean;
  name: string;
}

export class ProductSpecification {
  attributeId: number;
  attributeValueId: number;
  value: string;
}

export class ProductListing {
  dataCount: number;
  pageCount: number;
  data: ProductData[];
}

export class ProductData {
  productId: number;
  createdDate: string;
  name: string;
  storeName: string;
  status: string;
  statusCode: string;
  verifiedById: number;
  verifiedByName: string;
  brandId: number;
  brandName: string;
  categoryOneId: number;
  categoryTwoId: number;
  categoryThreeId: number;
  isactive: boolean;
  qtyTypeValue: string;
  qtyType: string;
}

export class UpdateStock {
  productId: number;
  qtyType: string;
  status?: number;
  message?: string;

}

export class ProductDetailList {
  status: number;
  message: string;
  data: ProductDetailData;
}

export class ProductDetailData {
  status: number;
  message: string;
  productId: number;
  name: string;
  nameEn: string;
  highlight: string;
  highlightEn: string;
  description: string;
  sku: string;
  brandId: number;
  brandName: string;
  storeId: number;
  classification: string;
  qty: number;
  qtyType: string;
  statusCode: string;
  categoryOneId: number;
  categoryOneName: string;
  categoryTwoId: number;
  categoryTwoName: string;
  categoryThreeId: number;
  categoryThreeName: string;
  imageUrl: any[];
  pricelist: number;
  couriers: ListCorier[];
  isGuarantee: boolean;
  guaranteeType: string;
  guaranteeTime: string;
  pricelistlast: number;
  classificationValue: string;
  guaranteeTypeValue: string;
  guaranteeTimeValue: string;
  qtyTypeValue: string;
  version: number;
  weight: number;
  dimensionsWidth: number;
  dimensionsheight: number;
  specialPrice: number;
  dimensionslength: number;
  isStock: false;
  specification: SpecificationList[];
  approvalProductIssue: any[];
}
export class ListCorier {
  courierId: number;
  name: string;
  code: string;
  isUse: boolean;
}
export class SpecificationList {
  attributeId: number;
  attributeValueId: number;
  isMandatory: boolean;
  isInstanceAttribute: boolean;
  value: string;
}

export class EditProduct {
  couriers: any[];
  discount: number;
  guaranteeTime: string;
  pricelist: number;
  productId: number;
  qty: number;
  specialPrice: number;
}
