import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestAPIService {
  constructor(private http: HttpClient) {}
  getHeaders() {
    const token = sessionStorage.getItem('admin');
    return token
      ? new HttpHeaders().set('Authorization', 'Bearer ' + token)
      : null;
  }
  public static httpUploadFile = new HttpHeaders({
    'Content-Type': 'application/json;multipart/form-data;',
  });

  get(link: String): Observable<any> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(`${link}`, { headers: headers });
    return this.http.get(`${link}`);
  }
  findId(link: String, id: number): Observable<any> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link + '/' + id, { headers: headers });
    return this.http.get(link + '/' + id);
  }
  add(link: String, item: any): Observable<any> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.post(`${link}`, item, { headers: headers });
    return this.http.post(`${link}`, item);
  }
  post(link: String, item: FileReader): Observable<any> {
    return this.http.post(`${link}`, item, { headers: RestAPIService.httpUploadFile });
  }
  edit(link: String, item: any): Observable<any> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.post(`${link}`, item, { headers: headers });
    return this.http.put(`${link}`, item);
  }
  remove(link: String, id: number): Observable<any> {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.delete(`${link}/${id}`, { headers: headers });
    return this.http.delete(`${link}/${id}`);
  }
}
