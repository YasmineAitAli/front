import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../module/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointment:Appointment 
  
  constructor(private http: HttpClient) {
   }

  public addAppointment(appointment: Appointment) {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Appointment>('https://ebanking-app.herokuapp.com/addAppointment' ,appointment,{headers});
    
  }
 
}
