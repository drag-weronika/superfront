import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloaderRoutingModule } from './downloader-routing.module';
import { DownloaderComponent } from './downloader/downloader.component';


@NgModule({
  declarations: [DownloaderComponent],
  imports: [
    CommonModule,
    DownloaderRoutingModule
  ],
  exports: [DownloaderComponent]

})
export class DownloaderModule { }
