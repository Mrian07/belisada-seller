import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BrandList } from '@belisada-seller/core/models';
import { Observable } from 'rxjs';
import { Configuration } from '@belisada-seller/core/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getListBrand(queryParams): Observable<BrandList> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/brand', {params: params})
      .pipe(
        map(response => response as BrandList)
      );
  }
}
