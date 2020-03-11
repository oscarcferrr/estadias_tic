import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
        public router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit() {}

    onLoggedin(data) {
        localStorage.setItem('isLoggedin', 'true');
        console.log(data);
        this.navigateOk();
       /** this.loginService.login(data.email.value, data.pwd.value).subscribe(
            res => {

             this.navigateOk();
          },
          error => {
            console.error(error);
          },
        //   () => this.navigateOk()
          );**/
    }
    navigateOk() {
       /* this.loginService.getUsr(localStorage.getItem('user')).subscribe(
            res => {
                localStorage.setItem('id', res['_id']);
                localStorage.setItem('id_consultorio', res['consultorio_id']);
            }
        );   */
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigateByUrl('/dashboard');
    }

    navigateErr() {
        // localStorage.setItem('isLoggedin', 'false');
       // this.router.navigateByUrl('/access-denied');
        }
}
