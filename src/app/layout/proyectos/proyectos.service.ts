import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProyectosModel } from './proyecto.model';


@Injectable({
    providedIn: 'root'
})
export class ProyectosService {
    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) { }


    getProyectos() {
        return this.http.get(`${this.url}/projects`);
    }

    altaProyecto(proyecto: ProyectosModel) {
        return this.http.post(`${this.url}/save-project`, proyecto);
    }
    actualizaProyecto(proyecto: ProyectosModel) {
        return this.http.put(`${this.url}/update-project/${proyecto.id_proyecto}`, proyecto);
    }
    borrarProyecto(proyecto: ProyectosModel) {
        return this.http.delete(`${this.url}/delete-project/${proyecto.id_proyecto}`);
    }

}
