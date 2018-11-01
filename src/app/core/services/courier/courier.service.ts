import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '@belisada-seller/core/config';
import { Courier } from '@belisada-seller/core/models';

@Injectable({
  providedIn: 'root',
})
export class CourierService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getCourier(): Observable<Courier[]> {

    return this.http.get(this.configuration.apiURL + '/courier')
      .pipe(
        map(response => response as Courier[])
      );
  }
    getCouriere(a): Observable<Courier[]> {

    return this.http.get(this.configuration.apiURL + '/courier')
      .pipe(
        map(response => response as Courier[])
      );
  }
}
