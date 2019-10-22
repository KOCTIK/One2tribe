import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtService } from '../_services/jwt.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
 
  constructor(
    private jwtService: JwtService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available    
    const accessToken = this.jwtService.currentTokenValue;
    
    if (accessToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`  
      }
    });
    }


    return next.handle(request)


  }
}