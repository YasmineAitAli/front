import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/account/module/account.module';
import { Appointment } from 'src/app/appointment/module/appointment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {
  }

  public findClientAccounts(id: string): Observable<Accounts[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Accounts[]>('https://ebanking-app.herokuapp.com/client/' + id + '/comptes',{headers});
  }

  public findClientAppointments(id: string): Observable<Appointment[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Appointment[]>('https://ebanking-app.herokuapp.com/client/' + id + '/appointments',{headers});
  }

}
