import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ViceAdministrativo } from '../models/viceAdministrativo';
import { Departamento } from '../models/departamento';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ViceAdministrativoService {

  private opcionesUrl1 =  environment.base_url + '/viceAdministrativo'; 

  constructor(private http: HttpClient) { }



  getOpciones(): Observable<ViceAdministrativo[]> {
    return this.http.get<ViceAdministrativo[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getViceAdministrativoId(id: string): Observable<ViceAdministrativo> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<ViceAdministrativo>(url);
  }

  addOpcion (viceAdministrativo: ViceAdministrativo): Observable<ViceAdministrativo> {
    return this.http.post<ViceAdministrativo>(this.opcionesUrl1, viceAdministrativo, httpOptions);
  }

  updateOpcion (viceAdministrativo: ViceAdministrativo): Observable<any> {
    return this.http.put(this.opcionesUrl1, viceAdministrativo, httpOptions);
  }

  deleteOpcion (id: string): Observable<ViceAdministrativo> {
    return this.http.delete<ViceAdministrativo>(this.opcionesUrl1+id, httpOptions);
  }  
}
