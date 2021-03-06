import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UploaderModule} from 'src/app/uploader/uploader.module';
import { UploaderComponent} from 'src/app/uploader/uploader/uploader.component';
import { SaverComponent} from 'src/app/uploader/saver/saver.component';
import { NameSetterComponent} from 'src/app/uploader/name-setter/name-setter.component';

import { DataImportRoutingModule } from './data-import-routing.module';
import { DataImportComponent } from './data-import/data-import.component';
import { TableWithDataComponent } from './table-with-data/table-with-data.component';




@NgModule({
  declarations: [DataImportComponent, TableWithDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataImportRoutingModule,
    UploaderModule

  ]

})
export class DataImportModule { }
