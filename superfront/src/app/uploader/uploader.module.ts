import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader/uploader.component';


@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    UploaderRoutingModule
  ],
  exports: [UploaderComponent]

})
export class UploaderModule { }
