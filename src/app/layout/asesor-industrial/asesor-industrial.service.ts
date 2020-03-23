import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AsesorIndustrialModel } from './asesor-industrial.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorIndustrialService {

    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
  constructor(private http: HttpClient) { }
  getAsesores() {
    return this.http.get(`${this.url}/asesorsIn`);
}

altaAsesor(asesor: AsesorIndustrialModel) {
    return this.http.post(`${this.url}/save-asesorin`, asesor);
}
actualizaAsesor(asesor: AsesorIndustrialModel) {
    return this.http.put(`${this.url}/update-asesorIn/${asesor.id_asesorin}`, asesor);
}
borrarAsesor(asesor: AsesorIndustrialModel) {
    return this.http.delete(`${this.url}/delete-asesorIn/${asesor.id_asesorin}`);
}
}
