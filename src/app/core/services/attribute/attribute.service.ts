import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { AttributeValue } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getAttributesValue(queryParams): Observable<AttributeValue[]> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/attributevalue', {params: params})
      .pipe(
        map(response => response as AttributeValue[])
      );
  }
}
