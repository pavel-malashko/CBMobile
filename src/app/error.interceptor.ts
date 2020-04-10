import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './services/api.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _apiSrv: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this._apiSrv.isLoading = false;
            let error;
            if (err.status === 504) {
                error = 'Error connection to server';
            } else {
                error = err.error.message || err.statusText;
            }
            this._apiSrv.showAlert.next({type: 'danger', message: error});
            return throwError(error);
        }));
    }
}
