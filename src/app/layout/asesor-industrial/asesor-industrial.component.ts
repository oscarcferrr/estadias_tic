import { Component, OnInit } from '@angular/core';
import { AsesorIndustrialService } from './asesor-industrial.service';
import { AsesorIndustrialModel } from './asesor-industrial.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from '../empresas/empresas.service';
import { EmpresasModel } from '../empresas/empresas.model';



@Component({
  selector: 'app-asesor-industrial',
  templateUrl: './asesor-industrial.component.html',
  styleUrls: ['./asesor-industrial.component.scss']
})
export class AsesorIndustrialComponent implements OnInit {
    asesor = new AsesorIndustrialModel();
    asesores: AsesorIndustrialModel[] = [];
    empresas: EmpresasModel[] = [];
    keyword = 'nombre';
    closeResult: string;
    cargando = false;
    dtOptions: any = {};
  constructor(private asesorService: AsesorIndustrialService,
    private empresaService: EmpresasService, private modal: NgbModal) { }

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
      this.getAsesores();
      this.getEmpresas();
  }

  open(content) {
        this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

getAsesores() {
    this.asesorService.getAsesores()
        .subscribe((resp: any) => {
            this.asesores = resp;
            // console.log(resp);
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
    console.log(this.asesor);
    if (!this.asesor.id_asesorin) {
        this.asesor.estatus = 'activo';
        peticion = this.asesorService.altaAsesor(this.asesor);
        // this.consultorios.push(this.consultorio);
    } else {
        console.log('actualizar');
        peticion = this.asesorService.actualizaAsesor(this.asesor);
    }
    // console.log(this.consultorio);
    peticion.subscribe(resp => {
        this.ngOnInit();
        Swal.fire({
            title: this.asesor.nombre,
            text: 'Tramite exitoso',
            icon: 'success'
        });
    },
        (error) => {
            console.log(error.message);
            if (error.status === 403) { }
        });
}

actualizar(asesor: AsesorIndustrialModel, content) {
    this.asesor = asesor;
    this.open(content);
}

alta(content) {
    this.asesor = new AsesorIndustrialModel();
    this.open(content);
}

borrar(asesor: AsesorIndustrialModel, i: number) {
    this.modal.dismissAll();
    this.asesor = asesor;
    console.log(this.asesor);
    Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro de que desea borrar a ${this.asesor.nombre}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
    }).then(resp => {
        if (resp.value) {
            this.asesorService.borrarAsesor(this.asesor).subscribe((response: any) => {
                console.log(response);
                this.asesores.splice(i, 1);
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { }
                });
        }
    });

}

getEmpresas() {
    this.empresaService.getEmpresas()
        .subscribe((resp: any) => {
            this.empresas = resp;
            // console.log(resp);
            this.cargando = false;
        },
            (error) => {
                console.log(error.message);
                if (error.status === 403) { /*this.g.onLoggedout();*/ }
            });
    }

    selectEvent(item) {
        // console.log(item);
        this.asesor.id_empresa = item.id_empresa ;
    }


}
