export class SearchBarResponse {
  status: string;
  data: SearchBarData[];
  keyWord: string;
  categoryId: number;
  categoryName: string;
}

export class SearchBarData {
  productId: number;
  name: string;
  brandId: number;
  brandName: string;
  imageUrl: string;
  price: number;
}
