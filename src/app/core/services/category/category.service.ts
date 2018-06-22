import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { CategoryList, CategoryAttribute } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getListCategory(queryParams): Observable<CategoryList> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/category', {params: params})
      .pipe(
        map(response => response as CategoryList)
      );
  }

  getListCategoryAttribute(queryParams): Observable<CategoryAttribute[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/category/attribute', {params: params})
      .pipe(
        map(response => response as CategoryAttribute[])
      );
  }
}
