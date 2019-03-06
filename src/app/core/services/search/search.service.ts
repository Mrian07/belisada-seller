import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { SearchBarResponse } from '@belisada-seller/core/models/search/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getSearchBar(queryParams: Object): Observable<SearchBarResponse> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.elasticSearchUrl + '/searchbar', {params: params})
    .pipe(
      map(response => response as SearchBarResponse)
    );
  }
}
