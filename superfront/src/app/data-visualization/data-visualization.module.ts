import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { ChartComponent } from './chart/chart.component';
import { SharingComponent } from './sharing/sharing.component';
import { DescriptionComponent } from './description/description.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';


@NgModule({
  declarations: [ChartComponent, SharingComponent, DescriptionComponent, DataVisualizationComponent],
  imports: [
    CommonModule,
    DataVisualizationRoutingModule
  ]
})
export class DataVisualizationModule { }
