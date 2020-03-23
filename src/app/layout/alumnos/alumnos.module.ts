import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ArchwizardModule } from 'angular-archwizard';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosComponent } from './alumnos.component';


@NgModule({
  declarations: [AlumnosComponent],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    FormsModule,
    NgbModalModule,
    DataTablesModule,
    MDBBootstrapModule.forRoot(),
    ArchwizardModule,
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AlumnosComponent]
})
export class AlumnosModule { }
