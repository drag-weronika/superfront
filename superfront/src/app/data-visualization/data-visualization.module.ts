import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { ChartComponent } from './chart/chart.component';
import { SharingComponent } from './sharing/sharing.component';
import { DescriptionComponent } from './description/description.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { DropdownFileSearchComponent } from './dropdown-file-search/dropdown-file-search.component';
import { DisplayedChartComponent } from './displayed-chart/displayed-chart.component';
import { DataManipulationModule } from 'src/app/data-manipulation/data-manipulation.module';
import { CollapseMenuFileComponent } from 'src/app/data-manipulation/collapse-menu-file/collapse-menu-file.component';
import { DownloaderModule } from 'src/app/downloader/downloader.module';
import { DownloaderComponent } from 'src/app/downloader/downloader/downloader.component';

@NgModule({
  declarations: [ChartComponent, SharingComponent, DescriptionComponent, DataVisualizationComponent, DropdownFileSearchComponent, DisplayedChartComponent],
  imports: [
    CommonModule,
    DataVisualizationRoutingModule,
    DataManipulationModule,
    DownloaderModule
  ],
  exports: [ChartComponent, DisplayedChartComponent]
})
export class DataVisualizationModule { }
