import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '@belisada-seller/core/config';
import { Transaction } from '@belisada-seller/core/models/transaction/transaction.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private configuration: Configuration) { }

  getListOrder() {
      return this.http.get(this.configuration.apiURL + '/seller/order')
      .pipe(
        map(response => response as Transaction)
      );
  }
}
