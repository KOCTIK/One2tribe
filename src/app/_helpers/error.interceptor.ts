import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtService } from '../_services/jwt.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.jwtService.logout();
                location.reload(true);
            }

            if(err.status === 403){
                return throwError("You don't have access rights");
            }

            const error = err.error.message || err.statusText;

            return throwError(error);
        }))
    }
}