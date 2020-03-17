import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsesorAcademicoComponent } from './asesor-academico.component';


const routes: Routes = [
    {
        path: '',
        component: AsesorAcademicoComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorAcademicoRoutingModule { }
