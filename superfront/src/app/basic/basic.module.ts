import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualizationModule} from 'src/app/data-visualization/data-visualization.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic/basic.component';
import { BasicVisualizationComponent } from './basic-visualization/basic-visualization.component';


@NgModule({
  declarations: [BasicComponent, BasicVisualizationComponent],
  imports: [
    CommonModule,
    BasicRoutingModule,
    DataVisualizationModule
  ]
})
export class BasicModule { }
