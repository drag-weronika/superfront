import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
      { path: 'basic', loadChildren: () => import('./basic/basic.module').then(mod => mod.BasicModule)},
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
      { path: 'data-import', loadChildren: () => import('./data-import/data-import.module').then(mod => mod.DataImportModule)},
      { path: 'data-manipulation', loadChildren: () => import('./data-manipulation/data-manipulation.module').then(mod => mod.DataManipulationModule)},
      { path: 'data-visualization', loadChildren: () => import('./data-visualization/data-visualization.module').then(mod => mod.DataVisualizationModule)},
      { path: 'publications', loadChildren: () => import('./publications/publications.module').then(mod => mod.PublicationsModule)},
      { path: 'statistic', loadChildren: () => import('./statistic/statistic.module').then(mod => mod.StatisticModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
