import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { VirementsModule } from '../module/virements.module';


@Injectable({
  providedIn: 'root'
})
export class VirementsService {

  constructor(private http: HttpClient) {
  }
  public findAll(code: string): Observable<VirementsModule[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<VirementsModule[]>(
      'https://ebanking-app.herokuapp.com/compte/' + code +  '/virements'
      ,{headers});
  }
  
  public save(transfer: VirementsModule) {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    console.log("fctsave");
    return this.http.post<VirementsModule>('https://ebanking-app.herokuapp.com/virements', transfer,{headers});
  }
}