import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AlumnosModel} from '../layout/alumnos/alumnos.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AlumnosService } from '../layout/alumnos/alumnos.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  alumno = new AlumnosModel();
  constructor(private alumnosService: AlumnosService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {

    Swal.fire({
        title: 'Espere',
        text: 'Realizando registro',
        icon: 'info',
        allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    console.log(this.alumno);

       this.alumno.estatus = 'activo';
       peticion = this.alumnosService.altaAlumno(this.alumno);

    // console.log(this.consultorio);
    peticion.subscribe(resp => {
        this.ngOnInit();
        Swal.fire({
            title: this.alumno.nombres + ' ' + this.alumno.apellidoPaterno
                + ' ' + this.alumno.apellidoMaterno,
            text: 'Se actualizo correctamente',
            icon: 'success'
        });
    },
        (error) => {
            console.log(error.message);
            if (error.status === 403) { }
        });

}

}
