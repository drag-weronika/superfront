import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { BasicModule} from './basic/basic.module';
import { DataImportModule } from './data-import/data-import.module';
import { DataManipulationModule } from './data-manipulation/data-manipulation.module';
import { DataVisualizationModule } from './data-visualization/data-visualization.module';
import { PublicationsModule } from './publications/publications.module';
import { StatisticModule } from './statistic/statistic.module';
import { UploaderModule } from './uploader/uploader.module';
import { HighchartsService } from './highcharts.service';
import { BasicAuthHtppInterceptorService } from './basicAuthHtppInterceptor.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    BasicModule,
    DataImportModule,
    DataManipulationModule,
    DataVisualizationModule,
    PublicationsModule,
    StatisticModule,
    UploaderModule,
    NgMultiSelectDropDownModule.forRoot()


  ],
  providers: [HighchartsService,
  {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
