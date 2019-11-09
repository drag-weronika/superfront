import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/FileRest';
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

  created: boolean;
  notCreated: boolean;
  categoryErrorOccurred: boolean = false


  constructor(public dataManipulationService: DataManipulationService ) {
        this.created=false;
        this.notCreated=false;
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
    this.created=false;
    this.notCreated=false;
    let fileRest = new FileRest();
    fileRest.fileId = this.selectedFileId;
    fileRest.groupId = this.selectedGroupId;
    fileRest.categoryId = this.selectedCategoryId;

    if (this.selectedFileId && this.selectedFileId != 0 &&
            (this.selectedCategoryId && this.selectedCategoryId != 0 ||
                this.selectedGroupId && this.selectedGroupId != 0)) {
        console.log(this.selectedFileId + " " + this.selectedCategoryId + " " + this.selectedGroupId)
        this.dataManipulationService.updateFile(fileRest).subscribe(
        (event)=>{
            this.created=true;
        }
        );
    } else {
        this.notCreated = true;
    }
  }


    openModal(id: string) {
        this.categoryErrorOccurred = false
        this.dataManipulationService.open(id);
    }

    closeModal(id: string) {
        let category = new Category();
        category.categoryName = this.bodyText;
        this.dataManipulationService.addCategory(category).subscribe(
         data=>{
            this.getCategories();
            this.dataManipulationService.close(id);
         },
         error=> {
            this.categoryErrorOccurred = true
         }
        );
    }

     closeMod(id: string) {
            this.dataManipulationService.close(id);
     }

  bodyText: string;

  ngOnInit() {
    this.bodyText = '';
    this.getFiles();
    this.getGroups();
    this.getCategories();
  }


}
