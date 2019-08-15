import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BasicComponent } from './basic/basic.component';
import { BasicVisualizationComponent } from './basic-visualization/basic-visualization.component';

const routes: Routes = [
      {path: '', component: BasicComponent},
      {path: 'visualization', component: BasicVisualizationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
