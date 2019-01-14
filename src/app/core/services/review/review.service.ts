import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { GetRevResponse, RevList } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getReview(queryParams): Observable<GetRevResponse> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/productfeedback/review/seller/', {params: params})
      .pipe(
        map(response => response as GetRevResponse)
      );
  }

  getAllReview(productId, queryParams): Observable<RevList> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/productfeedback/review/seller/' + productId , {params: params})
      .pipe(
        map(response => response as RevList)
      );
  }
}
