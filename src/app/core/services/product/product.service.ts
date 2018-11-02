import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import {
  AddProductRequest, AddProductResponse, ProductListing,
  UpdateStockRequest, ProductDetailList, ProductSuggestion, ProductSuggestionDetail, EditProductRequest,
  UpdateStockResponse, EditProductFullRequest, ProdReq, AddProdDetail, VariantAttr, ProductCreate, DetailResnponsev2
} from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  addProduct(data: AddProductRequest): Observable<AddProductResponse> {
    return this.http.post(this.configuration.apiURL + '/seller/product/create', data)
      .pipe(
        map(response => response as AddProductResponse)
      );
  }

  addProductV2(data: ProductCreate) {
    return this.http.post(this.configuration.apiURL + '/seller/product/create/v2', data)
      .pipe(
        map(response => response as any)
      );
  }
  editProduct(data: EditProductFullRequest) {
    return this.http.put(this.configuration.apiURL + '/seller/product/update', data)
      .pipe(
        map(response => response as any)
      );
  }
  editProductBasic(data: EditProductRequest) {
    return this.http.put(this.configuration.apiURL + '/seller/product/basic/update', data)
      .pipe(
        map(response => response as any)
      );
  }

  getProdListing(queryParams): Observable<ProductListing> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/seller/product', {params: params})
      .pipe(
        map(response => response as ProductListing)
      );
  }
  editStock(data: UpdateStockRequest)  {
    return this.http.put(this.configuration.apiURL + '/seller/product/quantity/update', data)
      .pipe(
        map(rsl => rsl as UpdateStockResponse)
      );
  }

  prodReq(data: ProdReq)  {
    return this.http.post(this.configuration.apiURL + '/product-request/create', data)
      .pipe(
        map(rsl => rsl as ProdReq[])
      );
  }

  getProdDetail(id: any): Observable<AddProductRequest[]>  {
    return this.http.get(this.configuration.apiURL + '/seller/product/suggest/detail/' + id)
    .pipe(
      map(rsl => rsl as AddProductRequest[])
    );
  }

  getProdVariant(id: any): Observable<VariantAttr[]>  {
    return this.http.get(this.configuration.apiURL + '/seller/product/suggest/varian/detail/' + id)
    .pipe(
      map(rsl => rsl as VariantAttr[])
    );
  }
  editHide(data) {
    return this.http.put(this.configuration.apiURL + '/seller/product/hide/update', data);
  }

  getDetailById(id: any): Observable<ProductDetailList> {
    return this.http.get(this.configuration.apiURL + '/seller/product/detail/' + id)
      .pipe(
        map(response => response as ProductDetailList)
      );
  }
  detailProduct(id: any): Observable<ProductDetailList[]> {
    return this.http.get(this.configuration.apiURL + '/seller/product/detail/' + id)
      .pipe(
        map(response => response as ProductDetailList[])
      );
  }

  getProductSuggestion(queryParams): Observable<ProductSuggestion[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });

    return this.http.get(this.configuration.apiURL + '/seller/product/suggest', {params: params})
      .pipe(
        map(response => response as ProductSuggestion[])
      );
  }
  getProductSuggestionPart2(queryParams): Observable<ProductSuggestion> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });

    return this.http.get(this.configuration.apiURL + '/seller/product/suggest', {params: params})
      .pipe(
        map(response => response as ProductSuggestion)
      );
  }

  getProductSuggestionDetail(id): Observable<ProductSuggestionDetail> {
    return this.http.get(this.configuration.apiURL + '/seller/product/suggest/detail/' + id)
      .pipe(
        map(response => response as ProductSuggestionDetail)
      );
  }

  getProductV2(id): Observable<DetailResnponsev2> {
    return this.http.get(this.configuration.apiURL + '/seller/product/detail/v2/' + id)
      .pipe(
        map(response => response as DetailResnponsev2)
      );
  }
}
