import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EmpresasModel } from './empresas.model';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  constructor(private http: HttpClient) { }

  getEmpresas() {
    return this.http.get(`${this.url}/enterprises`);
  }
  altaEmpresa(empresa: EmpresasModel) {

    return this.http.post(`${this.url}/save-enterprise`, empresa);
  }
  actualizaEmpresa(empresa: EmpresasModel) {
    return this.http.put(`${this.url}/update-enterprise/${empresa.id_empresa}`, empresa);
  }
   borrarEmpresa(empresa: EmpresasModel) {
    const params = new HttpParams()
        .set('id', String(empresa.id_empresa));
    return this.http.delete(`${this.url}/delete-enterprise/${empresa.id_empresa}`);
}
}
