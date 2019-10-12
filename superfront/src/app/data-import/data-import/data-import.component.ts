import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest,HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileRest } from 'src/app/_models/fileRest';
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
  fileToGetName: File;
  fileToSave: File;
  errorOccurred: boolean;
  uploadSuccess: boolean;


  constructor(private dataImportService: DataImportService){
    this.errorOccurred = false;
    this.uploadSuccess = false;
  }

  readCsv(content) {

      let allTextLines = content.split(/\r\n/);
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
          this.fileToUpload1.fileContent.push(point);
      }
      console.log(this.fileToUpload1.fileContent);
  }

  parseFile(file) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.readCsv(fileReader.result);
      }
      fileReader.readAsText(file);
    }

   onChange(theFile){
       this.fileToUpload = new FileRest();
       this.fileToGetName=new File();

       console.log("zaladowano plik")
       this.fileToUpload1=new File();
       this.fileToUpload1.fileContent = [];
       this.parseFile(theFile);
        console.log("hejka");
        this.uploadDocument(theFile);
   }

      uploadDocument(file) {
             let fileReader = new FileReader();
             fileReader.onload = (e) => {
               this.fileToUpload.content = fileReader.result as string
               this.fileToUpload.ownerName = sessionStorage.getItem('username');
               console.log("XXXXXXXXXXXX"+this.fileToUpload.content);
             }
             fileReader.readAsText(file);
         }

   setName(name: string){
      console.log("ustawiam nazwe " + name);
      this.fileToUpload.fileName=name ;
   }


    fileSubmit(){
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

  ngOnInit() {
  }

}
