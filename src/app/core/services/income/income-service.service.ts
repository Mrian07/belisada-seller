import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import {
  GetDataContentIncome,
  ResponseWithdrawal
} from '@belisada-seller/core/models';
@Injectable({
  providedIn: 'root'
})
export class IncomeServiceService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getIncomeWithDate(queryParams): Observable<GetDataContentIncome> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/seller/withdraw', {params: params})
      .pipe(
        map(response => response as GetDataContentIncome)
      );
  }
    postIncome(data): Observable<ResponseWithdrawal> {
    return this.http.post(this.configuration.apiURL + '/seller/withdraw', data)
    .pipe(
      map(response => response as ResponseWithdrawal)
    );
  }

  getTotal() {
    return this.http.get(this.configuration.apiURL + '/seller/withdraw/total')
    .pipe(
      map(response => response as GetDataContentIncome)
    );
  }
  // getIncome(queryParams): Observable<GetDataContentIncome> {

  //   return this.http.get(this.configuration.apiURL + '/seller/product', {params: params})
  //     .pipe(
  //       map(response => response as GetDataContentIncome)
  //     );
  // }
}
