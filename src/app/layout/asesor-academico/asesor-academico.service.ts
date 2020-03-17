import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AsesorAcademicoModel } from './asesor-academico.model';

@Injectable({
  providedIn: 'root'
})
export class AsesorAcademicoService {

    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) { }
  getAsesores() {
    return this.http.get(`${this.url}/asesorsAca`);
}

altaAsesor(asesor: AsesorAcademicoModel) {
    return this.http.post(`${this.url}//save-asesorAca`, asesor);
}
actualizaAsesor(asesor: AsesorAcademicoModel) {
    return this.http.put(`${this.url}/update-asesorAca/${asesor.id_Asesor}`, asesor);
}
borrarAsesor(asesor: AsesorAcademicoModel) {
    const params = new HttpParams()
        .set('id', String(asesor.id_Asesor));
    return this.http.delete(`${this.url}/delete-asesorAca/:id`, { headers: this.headers, params: params });
}
}
