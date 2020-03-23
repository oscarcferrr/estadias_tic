import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { AsesorIndustrialRoutingModule } from './asesor-industrial-routing.module';
import { AsesorIndustrialComponent } from './asesor-industrial.component';


@NgModule({
  declarations: [AsesorIndustrialComponent],
  imports: [
    CommonModule,
    AsesorIndustrialRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    DataTablesModule,
    NgbModalModule,
    AutocompleteLibModule
  ]
})
export class AsesorIndustrialModule { }
