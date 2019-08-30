import { Component, OnInit } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { File } from 'src/app/_models/file';
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

  files: File[];
  constructor(public dataManipulationService: DataManipulationService ) { }

  getFiles(){
    this.dataManipulationService.getFiles().subscribe(
    (files : File[]) => { this.files = files;})
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
