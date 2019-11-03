import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest,HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileRest } from 'src/app/_models/FileRest';
import { File } from 'src/app/_models/file';

import { DataImportService } from 'src/app/data-import/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})

export class DataImportComponent implements OnInit {

  uploadPercent:number=0;
  fileToUpload: FileRest;
  fileToUpload1: File;
  point: Point;
  fileToSave: File;
  errorOccurred: boolean;
  parseErrorOccurred: boolean;
  uploadSuccess: boolean;


  constructor(private dataImportService: DataImportService){
    this.errorOccurred = false;
    this.uploadSuccess = false;
    this.parseErrorOccurred = false;
  }

  readCsv(content) {

      let allTextLines = content.split(/\r\n/);
      if (allTextLines[0].search(/[a-zA-Z]/) >=0) {
        allTextLines = allTextLines.slice(1)
      }
      let numberOfColumns = allTextLines[0].split(',').length
      for (let i=0;i<numberOfColumns;i++) {
          this.fileToUpload1.fileContent.push([])
      }

      for (let i = 0; i < allTextLines.length; i++) {
          let data = allTextLines[i].split(',');
          let point = new Point();

          if (data.length == 1) {
              point.y = data[0];
          } else {
              let tarr = [];
              tarr.push(data[0]);
              tarr.push(data[1]);
              point.x = tarr[0];
              point.y = tarr[1];
          }
          this.fileToUpload1.fileContent[0].push(point);
          for(let j = 2; j < data.length; j++) {
              point = new Point()
              point.x = data[0]
              point.y = data[j]
              this.fileToUpload1.fileContent[j-1].push(point);
          }
      }
  }

  parseFile(file) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.readCsv(fileReader.result);
      }

      fileReader.readAsText(file);
    }

   onChange(theFile){
       this.errorOccurred = false;
       this.uploadSuccess = false;
       this.parseErrorOccurred = false;

       this.fileToUpload = new FileRest();

       this.fileToUpload1=new File();
       this.fileToUpload1.fileContent = [];

       this.parseFile(theFile);

       this.uploadDocument(theFile);
   }

      uploadDocument(file) {
             let fileReader = new FileReader();
             fileReader.onload = (e) => {
               this.fileToUpload.content = fileReader.result as string

               if (!this.validateContent(this.fileToUpload.content)) {
                    this.parseErrorOccurred = true;
                    this.fileToUpload.content = null;
                    this.fileToUpload1 = null;
               } else {
                    this.parseErrorOccurred = false;
               }
               this.fileToUpload.ownerName = sessionStorage.getItem('username');
             }
             fileReader.readAsText(file);
         }

   setName(name: string){
      this.fileToUpload.fileName=name ;
   }


    fileSubmit(){
        if (this.fileToUpload.content != null) {
            this.dataImportService.addFile(this.fileToUpload).subscribe(
                r => {
                    this.uploadSuccess = true;
                    this.errorOccurred = false;
                },
                error => {
                    this.errorOccurred = true;
                    this.uploadSuccess = false;
                }
            )
        }
    }

    validateContent(content: string) {
      let allTextLines = content.split(/\r\n/);

      if (allTextLines[0].search(/[a-zA-Z]/) >=0) {
        allTextLines = allTextLines.slice(1)
      }

      let numberOfColumns = allTextLines[0].split(',').length

      for (let i = 0; i < allTextLines.length; i++) {
        if (allTextLines[i].split(',').length != numberOfColumns) {
            return false
        }
        for(let value of allTextLines[i].split(',')) {
            if (Number.isNaN(+value)) {
                return false
            }
        }
      }
      return true;
    }

  ngOnInit() {
  }

}
