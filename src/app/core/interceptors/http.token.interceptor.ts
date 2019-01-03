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
import { LoadingService } from '@belisada-seller/core/services/globals/loading.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private inj: Injector, private routes: Router, private location: Location, private loadingService: LoadingService) {}
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

          console.log('errror nih', err);
          if (err.status === 401) {
            if (token) {
              // swal('Anda belum Login atau Session Anda Expired, Anda Harus Login ulang')
              // .then((result) => {
              //   localStorage.removeItem('token');
              //   this.routes.navigateByUrl('/account/sign-in');
              // });

              localStorage.removeItem('token');
              this.routes.navigateByUrl('/auth/sign-in');

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
          } else if (err.status === 504) {
            swal('belisada.co.id', 'Oops!...something wrong... 504', 'error');
            this.loadingService.hide();
          } else {
            swal('belisada.co.id', err.statusText, 'error');
            this.loadingService.hide();
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
