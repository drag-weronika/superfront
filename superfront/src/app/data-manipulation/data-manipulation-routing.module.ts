import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DataManipulationComponent } from './data-manipulation/data-manipulation.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
      {path: '', component: DataManipulationComponent},
      {path: 'group', component: GroupComponent},
      {path: 'createCategory', component: DataManipulationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManipulationRoutingModule { }
