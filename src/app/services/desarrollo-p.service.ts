import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { cpuUsage } from 'process';


@Injectable({
  providedIn: 'root'
})
export class DesarrolloPService {

  private myAppUrl = 'https://localhost:7214/';
  private myApiUrl = 'api/Persona/';
  
  constructor(private http: HttpClient) { }

  getPersona(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getPersonaID(id: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }

  deletePersona (id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  savePersona (persona: any): Observable<any>{
    console.log("Ruta add->",this.myAppUrl + this.myApiUrl + persona);
    return this.http.post(this.myAppUrl + this.myApiUrl, persona);
  }

  putPersona(persona: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl, persona);
  }
}

