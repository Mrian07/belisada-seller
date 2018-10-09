import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import {RekeningRespon, AddRekeningRequest, RekeningUser } from '@belisada-seller/core/models';

@Injectable({
    providedIn: 'root'
})
export class RekeningService {
    constructor(private configuration: Configuration, private http: HttpClient) { }

    getBankUser(): Observable<RekeningUser[]> {
        return this.http.get(this.configuration.apiURL + '/bank/user')
        .pipe(
            map(response => response as RekeningUser[])
        );
    }

    getRekening(data): Observable<RekeningRespon[]> {
        return this.http.get(this.configuration.apiURL + '/bank-account/?type=' + data)
        .pipe(
            map(response => response as RekeningRespon[])
        );
    }

    addRekening(data: AddRekeningRequest): Observable<RekeningRespon> {
        return this.http.post(this.configuration.apiURL + '/bank-account/create', data)
        .pipe(
            map(response => response as RekeningRespon)
        );
    }

    deleteRekening(id): Observable<RekeningRespon[]> {
        return this.http.delete(this.configuration.apiURL + '/bank-account/delete/' + id)
        .pipe(
            map(response => response as RekeningRespon[])
        );
    }

    editRekening(data): Observable<RekeningRespon> {
        return this.http.post(this.configuration.apiURL + '/bank-account/update', data)
        .pipe(
            map(response => response as RekeningRespon)
        );
    }
}
