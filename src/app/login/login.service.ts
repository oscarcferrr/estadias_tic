import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }


  login(user: UserModel) {

    return this.http.get(`http://localhost:3700/user/${user.usuario}/${user.contrasena}` );
  }
}
