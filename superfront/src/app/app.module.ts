import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module'
import { BasicModule} from './basic/basic.module'
import { DataImportModule } from './data-import/data-import.module'
import { DataManipulationModule } from './data-manipulation/data-manipulation.module'
import { DataVisualizationModule } from './data-visualization/data-visualization.module'
import { PublicationsModule } from './publications/publications.module'

import { CreatorModule } from './creator/creator.module'
import { UploaderModule } from './uploader/uploader.module'
import { ExporterModule } from './exporter/exporter.module'
import { DownloaderModule } from './downloader/downloader.module'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    BasicModule,
    DataImportModule,
    DataManipulationModule,
    DataVisualizationModule,
    PublicationsModule,
    CreatorModule,
    UploaderModule,
    ExporterModule,
    DownloaderModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
