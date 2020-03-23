import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlumnosModel } from './alumnos.model';
import { AlumnosService } from './alumnos.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
// DataTable
import { Subject } from 'rxjs';

import { AsesorIndustrialService } from '../asesor-industrial/asesor-industrial.service';
import { AsesorIndustrialModel } from '../asesor-industrial/asesor-industrial.model';
import { AsesorAcademicoService } from '../asesor-academico/asesor-academico.service';
import { AsesorAcademicoModel } from '../asesor-academico/asesor-academico.model';
import { ProyectosService } from '../proyectos/proyectos.service';
import { ProyectosModel } from '../proyectos/proyecto.model';





@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit  {

    asesoresA: AsesorAcademicoModel[] = [];
    keyword = 'nombre';
    asesoresI: AsesorIndustrialModel[] = [];
    proyectos: ProyectosModel[] = [];
    alumno = new AlumnosModel();
    alumnos: AlumnosModel[] = [];
    closeResult: string;
    cargando = false;
    dtOptions: any = {};

    constructor(private alumnosService: AlumnosService,
        private asesorAcdService: AsesorAcademicoService,
        private asesorIndSerrvice: AsesorIndustrialService,
        private proyectoService: ProyectosService,
        private modal: NgbModal) { }

    ngOnInit() {
        this.dtOptions = {
            dom: 'Bfrtip',
            buttons: [
               'pageLength'
            ],
            pagingType: 'full_numbers',
            pageLength: 10
          };
        this.getAlumnos();
        this.getAsesores();
        this.getProyectos();
        this.getAsesoresIn();

    }


    open(content) {
        // console.log(this.consultorio);
        this.modal.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {

        });
    }

    getAlumnos() {
        this.alumnosService.getAlumnos()
            .subscribe((resp: any) => {
                this.alumnos = resp;
                console.log(resp);
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
        let peticion: Observable<any>;
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
            text: `Está seguro de que desea borrar a ${this.alumno.nombres}`,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(resp => {
            if (resp.value) {
                this.alumnosService.borrarAlumno(this.alumno).subscribe((response: any) => {
                    console.log(response);
                    this.alumnos.splice(i, 1);
                },
                    (error) => {
                        console.log(error.message);
                        if (error.status === 403) { }
                    });
            }
        });

    }
    getAsesores() {
        this.asesorAcdService.getAsesores()
            .subscribe((resp: any) => {
                this.asesoresA = resp;
                console.log(resp);
                // console.log('consultorios: ', resp);
                this.cargando = false;
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { /*this.g.onLoggedout();*/ }
                });
    }

    selectEventAcademico(item) {
        // console.log(item);
        this.alumno.id_asesoraca = item.id_Asesor ;
    }
    getProyectos() {
        this.proyectoService.getProyectos()
            .subscribe((resp: any) => {
                this.proyectos = resp;
                console.log(resp);
                // console.log('consultorios: ', resp);
                this.cargando = false;
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { /*this.g.onLoggedout();*/ }
                });
    }
    selectEventProyecto(item) {
        // console.log(item);
        this.alumno.id_proyecto = item.id_proyecto ;
    }

    getAsesoresIn() {
        this.asesorIndSerrvice.getAsesores()
            .subscribe((resp: any) => {
                this.asesoresI = resp;
                // console.log(resp);
                this.cargando = false;
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { /*this.g.onLoggedout();*/ }
                });
    }
    selectEventIndustrial(item) {
        // console.log(item);
        this.alumno.id_asesorin = item.id_asesorin ;
    }

}
