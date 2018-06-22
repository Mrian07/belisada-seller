import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { Reference } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root',
})
export class ReferenceService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getReference(queryParams): Observable<Reference[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/reference', {params: params})
      .pipe(
        map(response => response as Reference[])
      );
  }
}
