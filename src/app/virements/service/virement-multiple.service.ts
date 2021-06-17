import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VirementMultiple } from '../module/virement-multiple';

@Injectable({
  providedIn: 'root'
})
export class VirementMultipleService {

  constructor(private http:HttpClient) { }

  public getVirementMultiple() {
    return this.http.get<VirementMultiple[]>('http://localhost:8091/virement/multiple');
  }
  
  public saveVirementMultiple(virement:any) {
    return this.http.post<any>('http://localhost:8091/virement/multiple', virement);
  }
  public getVirementById(id:string):Observable<VirementMultiple[]>{
    return this.http.get<VirementMultiple[]>(`http://localhost:8091/virement/multiple/client/${id}`);

  }
}
