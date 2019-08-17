import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExporterRoutingModule } from './exporter-routing.module';
import { ExporterComponent } from './exporter/exporter.component';


@NgModule({
  declarations: [ExporterComponent],
  imports: [
    CommonModule,
    ExporterRoutingModule
  ],
  exports: [ExporterComponent]
})
export class ExporterModule { }
