import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import swal from 'sweetalert2';


import { AuthService } from '@belisada-seller/core/services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private inj: Injector, private routes: Router, private location: Location) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    const token = auth.getToken();
    const sendtoken = {
      token : token
    };

      request = request.clone({
        setHeaders: {
          token: `${auth.getToken()}`
        },
      });

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            if (token) {
              // swal('Anda belum Login atau Session Anda Expired, Anda Harus Login ulang')
              // .then((result) => {
              //   localStorage.removeItem('token');
              //   this.routes.navigateByUrl('/account/sign-in');
              // });

              localStorage.removeItem('token');
              this.routes.navigateByUrl('/account/sign-in');

            }
          } else if (err.status === 404) {
          } else if (err.status === 400) {
            // swal('Oops!...something wrong...')
            // .then((result) => {
            //   //this.routes.navigateByUrl('/404');
            // });
          } else if (err.status === 500) {
            swal('belisada.co.id', 'Oops!...something wrong... 500', 'error');
            // .then((result) => {
            //  this.routes.navigateByUrl('/maintenance');
          // });
          } else {
            // swal('Oops!...something wrong...')
            // .then((result) => {
            //  this.routes.navigateByUrl('/maintenance');
          // });
          }
        }
      })
    );
  }
}
