import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataImportComponent } from './data-import/data-import.component';

const routes: Routes = [
      {path: '', component: DataImportComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataImportRoutingModule { }
