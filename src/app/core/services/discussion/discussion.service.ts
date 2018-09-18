import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { GetDisResponse, AddDisResponse, AddDisRequest } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getDiscussion(queryParams): Observable<GetDisResponse> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/productfeedback/discus/', {params: params})
      .pipe(
        map(response => response as GetDisResponse)
      );
  }

  getAllDisccusion(productId, queryParams): Observable<GetDisResponse> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/productfeedback/discus/all/' + productId , {params: params})
      .pipe(
        map(response => response as GetDisResponse)
      );
  }

  addDiscussion(data: AddDisRequest): Observable<AddDisResponse> {

    // console.log('kirim: ', data);

    return this.http.post(this.configuration.apiURL + '/productfeedback/discus/create-seller/', data)
      .pipe(
        map(response => response as AddDisResponse)
      );
  }
}
