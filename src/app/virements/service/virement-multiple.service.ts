import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VirementMultiple } from '../module/virement-multiple';

@Injectable({
  providedIn: 'root'
})
export class VirementMultipleService {

  constructor(private http:HttpClient) { }

  public getVirementMultiple() {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<VirementMultiple[]>('https://ebanking-app.herokuapp.com/virement/multiple',{headers});
  }
  
  public saveVirementMultiple(virement:any) {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<any>('https://ebanking-app.herokuapp.com/virement/multiple', virement,{headers});
  }
  public getVirementById(id:string):Observable<VirementMultiple[]>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<VirementMultiple[]>(`https://ebanking-app.herokuapp.com/virement/multiple/client/${id}`,{headers});

  }
}
