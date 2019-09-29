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
  fileToUpload1: Point[];
  
  fileToGetName: File;
  fileToSave: File;

  constructor(private dataImportService: DataImportService){}

  readCsv(content) {
      let allTextLines = content.split(/\r\n/);
      for (let i = 0; i < allTextLines.length; i++) {
          let data = allTextLines[i].split(',');
          let tarr = [];
          tarr.push(data[0]);
          tarr.push(data[1]);
          let point = new Point();
          point.x = tarr[0];
          point.y = tarr[1];
          this.fileToUpload1.fileContent.push(point);
      }
  }

   onChange(theFile){
       this.fileToUpload = new FileRest();
       this.fileToGetName=new File();
       console.log("zaladowano plik")
       this.uploadDocument(theFile);
       this.readCsv(theFile);

   }

      uploadDocument(file) {
             let fileReader = new FileReader();
             fileReader.onload = (e) => {
               this.fileToUpload.content = fileReader.result as string
             }
             fileReader.readAsText(file);
         }

   setName(name: string){
      console.log("ustawiam nazwe " + name);
      this.fileToUpload.fileName=name ;
   }


    fileSubmit(){
        this.dataImportService.addFile(this.fileToUpload).subscribe()
    }

  ngOnInit() {
  }

}
