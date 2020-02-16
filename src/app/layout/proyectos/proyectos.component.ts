import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {
    closeResult: string;
    dtOptions: any = {};
  constructor(private modal: NgbModal) { }

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


}