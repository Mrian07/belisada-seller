import { AttributeValue } from '@belisada-seller/core/models';

export class CategoryList {
  dataCount: number;
  pageCount: number;
  data: Category[];
}

export class Category {
  categoryId: number;
  name: string;
  nameEn: string;
  type: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
  parentId: number;
  iconUrl: string;
}

export class CategoryAttribute {
  attributeId: number;
  name: string;
  description: string;
  isMandatory: boolean;
  isInstanceAttribute: boolean;
  data: AttributeValue[];
}
