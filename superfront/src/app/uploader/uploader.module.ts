import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader/uploader.component';
import { SaverComponent } from './saver/saver.component';

@NgModule({
  declarations: [UploaderComponent, SaverComponent],
  imports: [
    CommonModule,
    UploaderRoutingModule
  ],
  exports: [UploaderComponent, SaverComponent]

})
export class UploaderModule { }
