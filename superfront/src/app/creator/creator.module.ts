import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatorRoutingModule } from './creator-routing.module';
import { GroupCreatorComponent } from './group-creator/group-creator.component';
import { CategoryCreatorComponent } from './category-creator/category-creator.component';


@NgModule({
  declarations: [GroupCreatorComponent, CategoryCreatorComponent],
  imports: [
    CommonModule,
    CreatorRoutingModule
  ],
  exports: [GroupCreatorComponent,CategoryCreatorComponent]
})
export class CreatorModule { }
