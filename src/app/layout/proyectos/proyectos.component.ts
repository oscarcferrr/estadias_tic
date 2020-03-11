import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProyectosModel } from './proyecto.model';
import { ProyectosService } from './proyectos.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

    proyecto = new ProyectosModel();
    proyectos: ProyectosModel[] = [];
    closeResult: string;
    cargando = false;
    dtOptions: any = {};

  constructor(private proyectosService: ProyectosService,
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
      this.getProyectos();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

getProyectos() {
    this.proyectosService.getProyectos()
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
    console.log(this.proyecto);
    if (!this.proyecto.id_proyecto) {
        this.proyecto.estatus = 'activo';
        peticion = this.proyectosService.altaProyecto(this.proyecto);
        // this.consultorios.push(this.consultorio);
    } else {
        console.log('actualizar');
        peticion = this.proyectosService.actualizaProyecto(this.proyecto);
    }
    // console.log(this.consultorio);
    peticion.subscribe(resp => {
        this.ngOnInit();
        Swal.fire({
            title: this.proyecto.nombre,
            text: 'Se actualizo correctamente',
            icon: 'success'
        });
    },
        (error) => {
            console.log(error.message);
            if (error.status === 403) { }
        });
}

actualizar(proy: ProyectosModel, content) {
    this.proyecto = proy;
    this.open(content);
}

alta(content) {
    this.proyecto = new ProyectosModel();
    this.open(content);
}

borrar(proy: ProyectosModel, i: number) {
    this.modal.dismissAll();
    this.proyecto = proy;
    console.log(this.proyecto);
    Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro de que desea borrar a ${this.proyecto.nombre}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
    }).then(resp => {
        if (resp.value) {
            this.proyectosService.borrarProyecto(this.proyecto).subscribe((response: any) => {
                console.log(response);
                this.proyectos.splice(i, 1);
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { }
                });
        }
    });

}


}
