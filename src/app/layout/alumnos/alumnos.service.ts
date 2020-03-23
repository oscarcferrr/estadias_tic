import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlumnosModel } from '../alumnos/alumnos.model';

@Injectable({
    providedIn: 'root'
})
export class AlumnosService {
    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getAlumnos() {
        return this.http.get(`${this.url}/students`);
    }

    altaAlumno(alumno: AlumnosModel) {
        return this.http.post(`${this.url}/save-student`, alumno);
    }
    actualizaAlumno(alumno: AlumnosModel) {
        return this.http.put(`${this.url}/update-student/${alumno.id_alumno}`, alumno);
    }
    borrarAlumno(alumno: AlumnosModel) {
        return this.http.delete(`${this.url}/delete-student/${alumno.id_alumno}`);
    }



}

