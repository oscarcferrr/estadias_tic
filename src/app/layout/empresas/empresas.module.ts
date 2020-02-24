import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import {ArchwizardModule } from 'angular-archwizard';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { EmpresasComponent } from './empresas.component';



@NgModule({
  declarations: [EmpresasComponent],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    FormsModule,
    NgbModalModule,
    DataTablesModule,
    ArchwizardModule
  ]
})
export class EmpresasModule { }
