import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManipulationRoutingModule } from './data-manipulation-routing.module';
import { DataManipulationComponent } from './data-manipulation/data-manipulation.component';
import { CollapseMenuFileComponent } from './collapse-menu-file/collapse-menu-file.component';
import { CollapseMenuGroupComponent } from './collapse-menu-group/collapse-menu-group.component';
import { CollapseMenuCategoryComponent } from './collapse-menu-category/collapse-menu-category.component';
import { SaveButtonComponent } from './save-button/save-button.component';

import { CreatorModule}  from 'src/app/creator/creator.module';
import { GroupCreatorComponent}  from 'src/app/creator/group-creator/group-creator.component';
import { CategoryCreatorComponent}  from 'src/app/creator/category-creator/category-creator.component';
import { GroupComponent } from './group/group.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DataManipulationComponent, CollapseMenuFileComponent, CollapseMenuGroupComponent, CollapseMenuCategoryComponent, SaveButtonComponent, GroupComponent],
  imports: [
    CommonModule,
    DataManipulationRoutingModule,
    CreatorModule,
    FormsModule
  ],
  exports: [CollapseMenuFileComponent]
})
export class DataManipulationModule { }
