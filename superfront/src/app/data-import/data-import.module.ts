import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UploaderModule} from 'src/app/uploader/uploader.module';
import { UploaderComponent} from 'src/app/uploader/uploader/uploader.component';



import { DataImportRoutingModule } from './data-import-routing.module';
import { DataImportComponent } from './data-import/data-import.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { TableWithDataComponent } from './table-with-data/table-with-data.component';


@NgModule({
  declarations: [DataImportComponent, DisplayTableComponent, TableWithDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataImportRoutingModule,
    UploaderModule

  ]

})
export class DataImportModule { }
