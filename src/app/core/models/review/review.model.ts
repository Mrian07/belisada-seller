export class GetRevResponse {
  content: ContainRev [];
  last: string;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: string;
  size: number;
  number: number;
}

export class ContainRev {
  name: string;
  productId: number;
  productImage: string;
  rateProduct: number;
}

export class RevList {
  content: ContainRevList [];
  last: string;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  first: string;
  size: number;
  number: number;
}

export class ContainRevList {
  message: string;
  star: number;
  userId: number;
  name: string;
  productId: number;
  since: string;
  imageAvatarUrl: string;
}
