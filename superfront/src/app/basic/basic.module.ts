import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic/basic.component';
import { BasicVisualizationComponent } from './basic-visualization/basic-visualization.component';


@NgModule({
  declarations: [BasicComponent, BasicVisualizationComponent],
  imports: [
    CommonModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
