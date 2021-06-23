import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeneficiaireModule } from '../module/beneficiaire/beneficiaire.module';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {
  constructor(private http: HttpClient) {
   }

  public AddBenef(beneficiaire: BeneficiaireModule): Observable<BeneficiaireModule[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<BeneficiaireModule[]>('http://localhost:8091/beneficiaire' ,beneficiaire,{headers});
    
  }
  public DeleteBenef(id: number): Observable<BeneficiaireModule[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<BeneficiaireModule[]>(`http://localhost:8091/beneficiaire/${id}`,{headers});

  }
  public GetBenefById(id:string): Observable<BeneficiaireModule[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<BeneficiaireModule[]>(`http://localhost:8091/beneficiaire/${id}`,{headers});
    
  }
  public GetAllBenefOfClient(id:string): Observable<BeneficiaireModule[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<BeneficiaireModule[]>(`http://localhost:8091/client/${id}/benef`,{headers});
    
  }
}
