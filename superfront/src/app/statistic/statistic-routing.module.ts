import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticAnalysisComponent } from './statistic-analysis/statistic-analysis.component';


const routes: Routes = [
{path: '', component: StatisticAnalysisComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
