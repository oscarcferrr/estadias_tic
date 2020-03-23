import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuariosModel } from './usuarios.model';
import { UsuariosService } from './usuarios.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
    usuario = new UsuariosModel();
    usuarios: UsuariosModel[] = [];
    closeResult: string;
    cargando = false;
    dtOptions: any = {};
  constructor(private usuarioService: UsuariosService,
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
      this.getUsuarios();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

getUsuarios() {
    this.usuarioService.getUsuarios()
        .subscribe((resp: any) => {
            this.usuarios = resp;
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
    console.log(this.usuario);
    if (!this.usuario.id) {
        this.usuario.estatus = 'activo';
        peticion = this.usuarioService.altaUsuario(this.usuario);
        // this.consultorios.push(this.consultorio);
    } else {
        console.log('actualizar');
        peticion = this.usuarioService.actualizaUsuario(this.usuario);
    }
    // console.log(this.consultorio);
    peticion.subscribe(resp => {
        this.ngOnInit();
        Swal.fire({
            title: this.usuario.usuario,
            text: 'Se actualizo correctamente',
            icon: 'success'
        });
    },
        (error) => {
            console.log(error.message);
            if (error.status === 403) { }
        });
}

actualizar(usu: UsuariosModel, content) {
    this.usuario = usu;
    this.open(content);
}

alta(content) {
    this.usuario = new UsuariosModel();
    this.open(content);
}

borrar(usu: UsuariosModel, i: number) {
    this.modal.dismissAll();
    this.usuario = usu;
    console.log(this.usuario);
    Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro de que desea borrar a ${this.usuario.usuario}`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
    }).then(resp => {
        if (resp.value) {
            this.usuarioService.borrarUsuario(this.usuario).subscribe((response: any) => {
                console.log(response);
                this.usuarios.splice(i, 1);
            },
                (error) => {
                    console.log(error.message);
                    if (error.status === 403) { }
                });
        }
    });

}


}
