import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    ArchwizardModule
  ]
})
export class RegistroModule { }
