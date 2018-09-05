import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Configuration } from '@belisada-seller/core/config';
import { ListOrderSellerResponse, Invoice, Resi } from '@belisada-seller/core/models/transaction/transaction.model';
import { map, } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  getInvoice(data: Invoice): Observable<Invoice> {
    return this.http.get(this.configuration.apiURL + '/seller/transaction/invoicenumber?orderNumber=' + data)
    .pipe(
      map(response => response as Invoice)
    );
  }

  addResi(data: Resi): Observable<Resi> {
    return this.http.post(this.configuration.apiURL + '/seller/order/confirmation/resi', data)
      .pipe(
        map(response => response as Resi)
      );
  }

  getShippingPdf(queryParams) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.post(this.configuration.apiURL + '/seller/order/confirmation/resi', {params: params});
  }
}
