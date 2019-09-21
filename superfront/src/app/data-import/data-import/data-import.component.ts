import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest,HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileRest } from 'src/app/_models/fileRest';


import { DataImportService } from 'src/app/data-import/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})

export class DataImportComponent implements OnInit {

  uploadPercent:number=0;
  fileToUpload: FileRest;

  constructor(private dataImportService: DataImportService){}

   onChange(theFile){
       this.fileToUpload = new FileRest();

       console.log("zaladowano plik")
       this.uploadDocument(theFile);

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
