import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest,HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from 'src/app/_models/file';


import { DataImportService } from 'src/app/data-import/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})

export class DataImportComponent implements OnInit {

  uploadPercent:number=0;
  fileToUpload: File;

  constructor(private dataImportService: DataImportService){}

   onChange(theFile){
       this.fileToUpload = new File();
       this.fileToUpload.fileContent = [];
       console.log("zaladowano plik")
       this.uploadDocument(theFile.target.files[0]);

   }

      uploadDocument(file) {
             let fileReader = new FileReader();
             fileReader.onload = (e) => {
               this.readCsv(fileReader.result);
             }
             fileReader.readAsText(file);
         }

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
               this.fileToUpload.fileContent.push(point)
             }
             console.log(this.fileToUpload);
         }

   setName(name: string){
       console.log("ustawiam nazwe");
      this.fileToUpload.fileName=name ;
   }


    fileSubmit(){
         const formData: any = new FormData();
         const file:File = this.fileToUpload;
         formData.append("filename",this.fileToUpload.fileName);
         console.log(this.fileToUpload.fileName);
         formData.append("uploads",this.fileToUpload.fileName);
          this.dataImportService.addFile(formData).subscribe(

          (event)=>{
                  if(event.type===HttpEventType.UploadProgress){

                      const percentDone = Math.round(100 * event.loaded/event.total);
                      console.log(`file is ${percentDone}% uploaded`);
                      this.uploadPercent = percentDone;

                  }else if(event instanceof HttpResponse){
                      console.log('file is completely uploaded!');
                      setTimeout(()=>{this.uploadPercent = 0;},1000)
                  }
            },
            (err)=>{
              console.log(err);
            },
            ()=>{
              console.log("done");
            }
          )
        }

  ngOnInit() {
  }

}
