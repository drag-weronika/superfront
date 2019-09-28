import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticAnalysisComponent } from './statistic-analysis/statistic-analysis.component';
import { DropdownFileByCategoryComponent } from './dropdown-file-by-category/dropdown-file-by-category.component';


@NgModule({
  declarations: [StatisticAnalysisComponent, DropdownFileByCategoryComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
