import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { SharingComponent } from './sharing/sharing.component';
import { DescriptionComponent } from './description/description.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { DropdownFileSearchComponent } from './dropdown-file-search/dropdown-file-search.component';
import { DataManipulationModule } from 'src/app/data-manipulation/data-manipulation.module';



@NgModule({
  declarations: [SharingComponent, DescriptionComponent, DataVisualizationComponent, DropdownFileSearchComponent],
  imports: [
    CommonModule,
    DataVisualizationRoutingModule,
    DataManipulationModule
  ],
  exports: []
})
export class DataVisualizationModule { }
