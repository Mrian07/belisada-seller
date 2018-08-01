import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { AddProductRequest, AddProductResponse, ProductListing, UpdateStock, ProductDetailList } from '@belisada-seller/core/models';

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
  editStock(data: UpdateStock)  {
    return this.http.put(this.configuration.apiURL + '/seller/product/stock/update', data)
      .pipe(
        map(rsl => rsl as UpdateStock)
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
}
