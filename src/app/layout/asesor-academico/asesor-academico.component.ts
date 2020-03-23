import { Component, OnInit } from '@angular/core';
import { AsesorAcademicoModel } from './asesor-academico.model';
import { AsesorAcademicoService } from './asesor-academico.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asesor-academico',
  templateUrl: './asesor-academico.component.html',
  styleUrls: ['./asesor-academico.component.scss']
})
export class AsesorAcademicoComponent implements OnInit {
    asesor = new AsesorAcademicoModel();
    asesores: AsesorAcademicoModel[] = [];
    closeResult: string;
    cargando = false;
    dtOptions: any = {};
  constructor(private asesorService: AsesorAcademicoService,
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
      this.getAsesores();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

getAsesores() {
    this.asesorService.getAsesores()
        .subscribe((resp: any) => {
            this.asesores = resp;
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
    console.log(this.asesor);
    if (!this.asesor.id_asesoraca) {
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
            text: 'Se actualizo correctamente',
            icon: 'success'
        });
    },
        (error) => {
            console.log(error.message);
            if (error.status === 403) { }
        });
}

actualizar(asesor: AsesorAcademicoModel, content) {
    this.asesor = asesor;
    this.open(content);
}

alta(content) {
    this.asesor = new AsesorAcademicoModel();
    this.open(content);
}

borrar(asesor: AsesorAcademicoModel, i: number) {
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


}
