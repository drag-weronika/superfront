import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticAnalysisComponent } from './statistic-analysis/statistic-analysis.component';
import { DropdownFileByCategoryComponent } from './dropdown-file-by-category/dropdown-file-by-category.component';


@NgModule({
  declarations: [StatisticAnalysisComponent, DropdownFileByCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
