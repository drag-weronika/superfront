import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { File } from 'src/app/_models/file';
import { Point } from 'src/app/_models/point';
import {UploaderService } from 'src/app/uploader/uploader.service';
import { HttpEventType,HttpResponse} from '@angular/common/http'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  constructor(private uploaderService:UploaderService) { }

  uploadPercent:number=0;
  fileToUpload: File;
  @Output() value=new EventEmitter<File>();

  onChange(theFile){
    this.fileToUpload = new File();
    this.fileToUpload.fileContent = [];
    console.log("zaladowano plik")
    this.uploadDocument(theFile.target.files[0]);

    this.value.emit(this.fileToUpload);
  }

  FileSubmit(){
     const formData: any = new FormData();
     const file:File = this.fileToUpload;
     formData.append("filename",file[0]['name']);
     console.log(file[0]['name']);
     formData.append("uploads",file[0]);
      this.uploaderService.addFile(formData).subscribe(

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

  ngOnInit() {
  }

}
