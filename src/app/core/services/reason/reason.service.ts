import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { AddReason, ReasonRespon } from '@belisada-seller/core/models/reason/reason.model';

@Injectable({
    providedIn: 'root'
})
export class ReasonService {
    constructor(private configuration: Configuration, private http: HttpClient) { }


    addReason(data: AddReason): Observable<ReasonRespon> {
        return this.http.post(this.configuration.apiURL + '/seller/order/confirmation/transactionrejected', data)
        .pipe(
            map(response => response as ReasonRespon)
        );
    }

}
