import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/fileRest';
import { Category } from 'src/app/_models/category';
import { Group } from 'src/app/_models/group';
import { UserRest } from 'src/app/_models/userRest';

@Component({
  selector: 'app-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.css']
})
export class DataManipulationComponent implements OnInit {
  selectedFileId: number;
  selectedCategoryId: number;
  selectedGroupId: number;

  selectedUser: UserRest;
  userSelects: UserRest[];

  files: FileRest[];
  categories: Category[];
  groups: Group[];

  users: UserRest[];
  userSelectsString = '';

  constructor(public dataManipulationService: DataManipulationService ) {

  }

  getFiles(){
    this.dataManipulationService.getFiles().subscribe(
    (files : FileRest[]) => { this.files = files;})
  }

  getGroups(){
      this.dataManipulationService.getGroups().subscribe(
      (groups : Group[]) => { this.groups = groups;})
    }
  getCategories(){
        this.dataManipulationService.getCategories().subscribe(
        (categories : Category[]) => { this.categories = categories;})
  }

  selectedChangeHandlerFile (event: any) {
      this.selectedFileId = event
  }

  selectedChangeHandlerCategory (event: any) {
      this.selectedCategoryId = event
  }

  selectedChangeHandlerGroup (event: any) {
      this.selectedGroupId = event
  }

  setSubmit(){
    let fileRest = new FileRest();
    fileRest.fileId = this.selectedFileId;
    fileRest.groupId = this.selectedGroupId;
    fileRest.categoryId = this.selectedCategoryId;
    this.dataManipulationService.updateFile(fileRest).subscribe((event)=>{});
  }


    openModal(id: string) {
        this.dataManipulationService.open(id);
    }

    closeModal(id: string) {
        this.dataManipulationService.close(id);
        let category = new Category();
        category.categoryName = this.bodyText;
        this.dataManipulationService.addCategory(category).subscribe(
                                                                      (event)=>{}
                                                                      );
    }
  bodyText: string;

  ngOnInit() {
    this.bodyText = '';
    this.getFiles();
    this.getGroups();
    this.getCategories();
  }


}
