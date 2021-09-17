import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patientlist',
    pathMatch: 'full'
  },
  {
    path: 'patientlist',
    loadChildren: () => import('./pages/patientlist/patientlist.module').then( m => m.PatientlistPageModule)
  },
  {
    path: 'patientstatus',
    loadChildren: () => import('./pages/patientstatus/patientstatus.module').then( m => m.PatientstatusPageModule)
  },
  {
    path: 'addnewpatient',
    loadChildren: () => import('./pages/addnewpatient/addnewpatient.module').then( m => m.AddnewpatientPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
