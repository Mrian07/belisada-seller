import { PriceAndStock, Delivery, Courier } from '@belisada-seller/core/models';
import { BaseResponseModel } from '@belisada-seller/core/models/base-response.model';

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

export class AddProdDetail {
  status: number;
  message: string;
  data: AddProductRequest[];
}

export class Variant {
  imageUrl: any [];
  masterVarianId: number;
  attributeVarians: VariantAttr[];
}

export class VariantAttr {
  attributeId: number;
  attributeValueId: number;
  value: string;
}

export class ProductCreate {
  status: string;
  messsage: string;

  classification: string;
  couriers: Courier[];
  guaranteeTime: string;
  guaranteeType: string;
  highlight: string;
  masterId: number;
  varians: Varians[];
}

export class Varians {
  discount: string;
  masterVarianId: string;
  pricelist: number;
  qty:  number;
  specialPrice: number;
}
export class DetailResnponsev2 {
  status: number;
  message: string;
  data: AddProductRequest;
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
  categoryOneName: string;
  categoryTwoName: string;
  categoryThreeName: string;
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

export class ProdReq {
  brand: string;
  description: string;
  productName: string;
}

export class UpdateStockRequest {
  productId: number;
  qty: number;
}

export class UpdateStockResponse extends BaseResponseModel {

}

export class ProductDetailList {
  status: number;
  message: string;
  data: ProductDetailData;
}

export class ProductDetailData {
  status: string;
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
  discount: number;
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

export class EditProductRequest {
  classification: string;
  couriers: string[];
  dimensionsWidth: number;
  dimensionsheight: number;
  dimensionslength: number;
  discount: number;
  guaranteeTime: string;
  pricelist: number;
  productId: number;
  qty: number;
  specialPrice: number;
  weight: number;
  guaranteeType: number;
  highlight: string;
}

export class EditProductFullRequest {
  productId: number;
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

export class ProductSuggestion {
  productId: number;
  name: string;
  sku: string;
  brandId: number;
  brandName: string;
  categoryOneId: number;
  categoryOneName: string;
  categoryTwoId: number;
  categoryTwoName: string;
  categoryThreeId: number;
  categoryThreeName: string;
}


export class ProductSuggestionDetail {
  status: number;
  message: string;
  data: ProductDetailData;
}
