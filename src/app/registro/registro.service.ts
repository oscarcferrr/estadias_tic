import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  validarCodigo(codigo: string) {
    return this.http.get(`http://localhost:3700/studentByMatricula/${codigo}` );
  }
}
