import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _apiSrv: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this._apiSrv.getUser();
        if (user) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`,
                   'Content-Type':  'application/json',
                }
            });
        } else {
            request.clone({
                setHeaders: {
                   'Content-Type':  'application/json',
                }
            });
        }

        return next.handle(request);
    }
}
