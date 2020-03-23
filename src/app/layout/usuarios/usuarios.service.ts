import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuariosModel } from './usuarios.model';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    private url = 'http://localhost:3700';
    private headers = new HttpHeaders({});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) { }

    getUsuarios() {
        return this.http.get(`${this.url}/users`);
    }

    altaUsuario(usuario: UsuariosModel) {
        return this.http.post(`${this.url}/save-user`, usuario);
    }
    actualizaUsuario(usuario: UsuariosModel) {
        return this.http.put(`${this.url}/update-user/${usuario.id_usuario}`, usuario);
    }
    borrarUsuario(usuario: UsuariosModel) {
        return this.http.delete(`${this.url}/delete-user/${usuario.id_usuario}`);
    }
}
