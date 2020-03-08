import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasModel } from './empresas.model';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { EmpresasService } from './empresas.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  empresa = new EmpresasModel();
  empresas: EmpresasModel [] = [];
  closeResult: string;
  cargando = false;
  dtOptions: any = {};
  constructor(private modal: NgbModal,
             private empresasService: EmpresasService) { }

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
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
   }

   getAlumnos() {
    this.empresasService.getEmpresas()
        .subscribe((resp: any) => {
            this.empresas = resp;
            console.log(resp);
            // console.log('consultorios: ', resp);
            this.cargando = false;
        },
            (error) => {
                console.log(error.message);
                if (error.status === 403) { /*this.g.onLoggedout();*/ }
            });
    }

    actualizar(emp: EmpresasModel, content) {
            this.empresa = emp;
            this.open(content);
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
        console.log(this.empresa);
        if (!this.empresa.id_empresa) {
            this.empresa.estatus = 'activo';
            peticion = this.empresasService.altaEmpresa(this.empresa);
        } else {
            console.log('actualizar');
            peticion = this.empresasService.actualizaEmpresa(this.empresa);
        }
        peticion.subscribe(resp => {
            this.ngOnInit();
            Swal.fire({
                title: this.empresa.nombre ,
                text: 'Se actualizo correctamente',
                icon: 'success'
            });
        },
            (error) => {
                console.log(error.message);
                if (error.status === 403) { }
            });

    }

    borrar(emp: EmpresasModel, i: number) {
        this.modal.dismissAll();
        this.empresa = emp;
        console.log(this.empresa);
        Swal.fire({
            title: '¿Está seguro?',
            text: `Está seguro de que desea borrar a ${this.empresa.nombre}`,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(resp => {
            if (resp.value) {
                this.empresasService.borrarEmpresa(this.empresa).subscribe((response: any) => {
                    console.log(response);
                    this.empresas.splice(i, 1);
                },
                    (error) => {
                        console.log(error.message);
                        if (error.status === 403) { }
                    });
            }
        });

    }


}
