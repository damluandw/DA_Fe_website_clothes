import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private BASE_USER_URL: string = 'http://localhost:1111/api/user/product';
  private BASE_ADMIN_URL: string = 'http://localhost:1111/api/admin/product';
  constructor(private http: HttpClient) {}
  get(): Observable<any> {
    return this.http.get(this.BASE_USER_URL);
  }
  findId(id: number): Observable<any> {
    return this.http.get(this.BASE_USER_URL + '/' + id);
  }
  findName(name: string): Observable<any> {
    return this.http.get(this.BASE_USER_URL + '/' + name);
  }
  add(item: any): Observable<any> {
    return this.http.post(this.BASE_USER_URL, item);
  }
  edit(id: number, item: any): Observable<any> {
    return this.http.post(`${this.BASE_USER_URL}/${id}`, item);
  }
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_USER_URL}/${id}`);
  }
}
