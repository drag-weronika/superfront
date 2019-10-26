import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovarianceComponent } from './covariance/covariance.component';

const routes: Routes = [
      {path: '', component: CovarianceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CovarianceRoutingModule { }
