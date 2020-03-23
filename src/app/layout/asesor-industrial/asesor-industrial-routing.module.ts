import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsesorIndustrialComponent } from './asesor-industrial.component';


const routes: Routes = [
    {
        path: '',
        component: AsesorIndustrialComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorIndustrialRoutingModule { }
