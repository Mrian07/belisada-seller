import { PriceAndStock, Delivery } from '@belisada-seller/core/models';

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
  couriers: string[];
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
  qtyType: string;
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
