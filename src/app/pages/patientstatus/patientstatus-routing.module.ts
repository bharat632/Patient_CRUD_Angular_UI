import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientstatusPage } from './patientstatus.page';

const routes: Routes = [
  {
    path: '',
    component: PatientstatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientstatusPageRoutingModule {}
