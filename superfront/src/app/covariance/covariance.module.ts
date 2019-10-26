import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { CovarianceRoutingModule } from './covariance-routing.module';
import { CovarianceComponent } from './covariance/covariance.component';
import { DropdownFileSearchComponent } from './dropdown-file-search/dropdown-file-search.component';

@NgModule({
  declarations: [CovarianceComponent, DropdownFileSearchComponent],
  imports: [
    CommonModule,
    CovarianceRoutingModule,
    FormsModule
  ]
})
export class CovarianceModule { }
