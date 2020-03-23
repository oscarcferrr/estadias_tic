import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';
import { UserModel } from './user.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    user = new UserModel();
    constructor(
        public router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit() {}

    onLoggedin(data) {
        localStorage.setItem('user', data.email.value);
        this.user.contrasena = data.pwd.value;
        this.user.usuario =  data.email.value;
       this.loginService.login(this.user).subscribe(
            res => {
                console.log(res[0]);
                try {
                    if (res[0].estatus === 'activo') {
                        this.navigateOk();
                        localStorage.setItem('isLoggedin', 'true');
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Advertencia',
                        text: 'Usuario o contraseña icorrecta',
                        icon: 'warning'
                    });
                }
                         },
          error => {
            console.error(error);
            this.navigateErr();
          },
        //   () => this.navigateOk()
          );
    }
    navigateOk() {
       /* this.loginService.getUsr(localStorage.getItem('user')).subscribe(
            res => {
                localStorage.setItem('id', res['_id']);
                localStorage.setItem('id_consultorio', res['consultorio_id']);
            }
        );   */
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigateByUrl('/charts');
    }

    navigateErr() {
        localStorage.setItem('isLoggedin', 'false');
        this.router.navigateByUrl('/access-denied');
        }
}
