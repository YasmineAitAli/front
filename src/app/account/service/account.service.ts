import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/account/module/account.module';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {
  }

  public findAccountNum(id: string): Observable<Accounts> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Accounts>("https://ebanking-app.herokuapp.com/compte" + '/' + id,{headers});
  } 
  public findAccountId(id: string): Observable<Accounts[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Accounts[]>("https://ebanking-app.herokuapp.com/compte" + 's?id=' + id,{headers});
  }
}
