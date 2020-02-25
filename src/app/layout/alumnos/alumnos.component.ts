import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlumnosModel } from './alumnos.model';
import { AlumnosService } from './alumnos.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

    alumno = new AlumnosModel();
    alumnos:  AlumnosModel[] = [];
    closeResult: string;
    cargando = false;
    dtOptions: any = {};
  constructor(private alumnosService: AlumnosService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
        dom: 'Bfrtip',
        buttons: [
          'pdfHtml5',
          'print',
          'excel',
          'pageLength'
        ],
        pagingType: 'full_numbers',
        pageLength: 10
      };
      this.getAlumnos();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

getAlumnos() {
    this.alumnosService.getAlumnos()
      .subscribe( (resp: any) => {
        this.alumnos = resp;
        // console.log('consultorios: ', resp);
        this.cargando = false;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { /*this.g.onLoggedout();*/ }
      });
   }


   guardar(form: NgForm) {
    this.modal.dismissAll();
    Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      let peticion: Observable <any>;
      console.log(this.alumno);
      if (!this.alumno.id_alumno) {
          this.alumno.estatus = 'activo';
        peticion = this.alumnosService.altaAlumno(this.alumno);
        // this.consultorios.push(this.consultorio);
        } else {
          console.log('actualizar');
             peticion = this.alumnosService.actualizaAlumno(this.alumno);
        }
          // console.log(this.consultorio);
          peticion.subscribe( resp => {
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
          if (error.status === 403) {  }
          });

   }
   actualizar(alum: AlumnosModel, content) {
    this.alumno = alum;
    this.open(content);
    }

    alta(content) {
        this.alumno = new AlumnosModel();
        this.open(content);
    }

  borrar(alum: AlumnosModel, i: number) {
    this.modal.dismissAll();
    this.alumno = alum;
    console.log(this.alumno);
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar a ${ this.alumno.nombres}`,
     icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
           this.alumnosService.borrarAlumno(this.alumno).subscribe( (response: any) => {
            console.log(response);
            this.alumnos.splice(i, 1);
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) {  }
           });
         }
     });

  }

}
