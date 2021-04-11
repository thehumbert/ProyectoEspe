import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Iasa } from '../models/iasa';
import { Departamento } from '../models/departamento';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IasaService {

  private opcionesUrl1 =  environment.base_url + '/iasa'; 

  constructor(private http: HttpClient) { }



  getOpciones(): Observable<Iasa[]> {
    return this.http.get<Iasa[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getIasaId(id: string): Observable<Iasa> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<Iasa>(url);
  }

  addOpcion (iasa: Iasa): Observable<Iasa> {
    return this.http.post<Iasa>(this.opcionesUrl1, iasa, httpOptions);
  }

  updateOpcion (iasa: Iasa): Observable<any> {
    return this.http.put(this.opcionesUrl1, iasa, httpOptions);
  }

  deleteOpcion (id: string): Observable<Iasa> {
    return this.http.delete<Iasa>(this.opcionesUrl1+id, httpOptions);
  }
}
