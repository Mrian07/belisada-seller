export class BrandList {
    dataCount: number;
    pageCount: number;
    data: Brand[];
}

export class Brand {
    brandId: number;
    name: string;
    imageUrl: string;
    isActive: boolean;
}
