import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { Complain, ComplaintRequest, ComplaintPDC, Accept, Reject } from '@belisada-seller/core/models';

@Injectable({
    providedIn: 'root',
})
export class ComplainService {

constructor(private configuration: Configuration, private http: HttpClient) { }

    getComplain(queryParams): Observable<Complain> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
        params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/complain', {params: params})
        .pipe(
        map(response => response as Complain)
        );
    }

    acceptComplain(data): Observable<Accept> {
        return this.http.post(this.configuration.apiURL + '/complain/accept', data)
        .pipe(
            map(response => response as Accept)
        );
    }

    rejectComplain(data): Observable<Reject> {
        return this.http.post(this.configuration.apiURL + '/complain/reject', data)
        .pipe(
            map(response => response as Reject)
        );
    }

    getPDC(queryParams): Observable<ComplaintPDC[]> {
        let params = new HttpParams();
        Object.keys(queryParams).forEach(function(k) {
            params = params.append(k, queryParams[k]);
        });
        return this.http.get(this.configuration.apiURL + '/reference', {params: params})
        .pipe(
            map(response => response as ComplaintPDC[])
        );
    }
}
