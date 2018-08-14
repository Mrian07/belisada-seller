import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '@belisada-seller/core/config';
import { ListOrderSellerResponse } from '@belisada-seller/core/models/transaction/transaction.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getListOrder(queryParams) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
      return this.http.get(this.configuration.apiURL + '/seller/order/v2', {params: params})
      .pipe(
        map(response => response as ListOrderSellerResponse)
      );
  }
}
