import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataImportRoutingModule } from './data-import-routing.module';
import { DataImportComponent } from './data-import/data-import.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { TableWithDataComponent } from './table-with-data/table-with-data.component';


@NgModule({
  declarations: [DataImportComponent, DisplayTableComponent, TableWithDataComponent],
  imports: [
    CommonModule,
    DataImportRoutingModule
  ]
})
export class DataImportModule { }
