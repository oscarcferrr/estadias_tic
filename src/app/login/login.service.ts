import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    return this.http.get(`http://localhost:3700/user/:usuario${username}/:contrasena${password}`, );
  }
}
