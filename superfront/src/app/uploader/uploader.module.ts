import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader/uploader.component';
import { SaverComponent } from './saver/saver.component';
import { NameSetterComponent } from './name-setter/name-setter.component';

@NgModule({
  declarations: [UploaderComponent, SaverComponent, NameSetterComponent],
  imports: [
    CommonModule,
    UploaderRoutingModule
  ],
  exports: [UploaderComponent, SaverComponent, NameSetterComponent]

})
export class UploaderModule { }
