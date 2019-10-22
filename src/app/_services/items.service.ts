import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOMAIN } from '../_helpers/properties'

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getItems(): Observable<any> {
    return this.http.get<String>(`${DOMAIN}/api/v1/item`, this.httpOptions)
  }

  addItem(item: any): Observable<String> {
    return this.http.post<any>(`${DOMAIN}/api/v1/item`, { name: item })
  }
}
