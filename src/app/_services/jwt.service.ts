import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DOMAIN } from '../_helpers/properties'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) { }

  public get currentTokenValue(): any {
    return localStorage.getItem('token');
  }

  login(request: any) {
    return this.http.post<any>(`${DOMAIN}/api/authenticate`, request, this.httpOptions)
      .pipe(tap(
        (resp) => {
          if (resp) {
            //retrieves the value of Authorization field in Response Header 
            const bearerHeader = resp.headers.get('Authorization');
            //convert into array
            const bearer = bearerHeader.split(' ');
            //retrieves token
            const token = bearer[1];
            //saves token in localStorage
            localStorage.setItem('token', token)
          }
        }
      ));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
