import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/fileRest';
import { Category } from 'src/app/_models/category';
import { Group } from 'src/app/_models/group';

@Component({
  selector: 'app-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.css']
})
export class DataManipulationComponent implements OnInit {
  selectedFile: File;
  selectedCategory: Category;
  selectedGroup: Group;

  files: FileRest[];
  categories: Category[];
  groups: Group[];

  constructor(public dataManipulationService: DataManipulationService ) { }

  getFiles(){
    this.dataManipulationService.getFiles().subscribe(
    (files : FileRest[]) => { this.files = files;
    console.log(this.files[0].fileName);}
    )
  }

  getGoups(){
      this.dataManipulationService.getGroups().subscribe(
      (groups : Group[]) => { this.groups = groups;
      console.log(this.groups[0].groupName);}
      )
    }
    getCategories(){
        this.dataManipulationService.getCategories().subscribe(
        (categories : Category[]) => { this.categories = categories;
        console.log(this.categories[0].categoryName);}
        )
      }
  selectChangeHandler (event: any) {
      this.selectedFile = event.target.value;
  }

  setSubmit(){
      const formData: any = new FormData();
            formData.append("fileName",this.selectedFile.fileName);
            formData.append("categoryName",this.selectedCategory.categoryName);
            formData.append("groupName",this.selectedGroup.groupName);
            this.dataManipulationService.postSet(formData).subscribe(
            (event)=>{}
            );
  }



  ngOnInit() {

  }


}
