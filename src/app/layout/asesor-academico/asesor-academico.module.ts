import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AsesorAcademicoRoutingModule } from './asesor-academico-routing.module';
import { AsesorAcademicoComponent } from './asesor-academico.component';


@NgModule({
  declarations: [AsesorAcademicoComponent],
  imports: [
    CommonModule,
    AsesorAcademicoRoutingModule,
    FormsModule,
    NgbModalModule,
    DataTablesModule,
    MDBBootstrapModule
  ]
})
export class AsesorAcademicoModule { }
