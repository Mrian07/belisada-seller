import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import {
  AddProductRequest, AddProductResponse, ProductListing,
  UpdateStockRequest, ProductDetailList, ProductSuggestion, ProductSuggestionDetail, EditProductRequest, UpdateStockResponse
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
  editProduct(data: AddProductRequest) {
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

  getProductSuggestionDetail(id): Observable<ProductSuggestionDetail> {
    return this.http.get(this.configuration.apiURL + '/seller/product/suggest/detail/' + id)
      .pipe(
        map(response => response as ProductSuggestionDetail)
      );
  }
}
