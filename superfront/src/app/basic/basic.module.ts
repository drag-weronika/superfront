import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderModule} from 'src/app/uploader/uploader.module';
import { UploaderComponent} from 'src/app/uploader/uploader/uploader.component';
import { DataVisualizationModule} from 'src/app/data-visualization/data-visualization.module';
import { ChartComponent} from 'src/app/data-visualization/chart/chart.component';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic/basic.component';
import { BasicVisualizationComponent } from './basic-visualization/basic-visualization.component';


@NgModule({
  declarations: [BasicComponent, BasicVisualizationComponent],
  imports: [
    CommonModule,
    BasicRoutingModule,
    UploaderModule,
    DataVisualizationModule
  ]
})
export class BasicModule { }
