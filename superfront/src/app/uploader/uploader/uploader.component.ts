import { Component, OnInit } from '@angular/core';
import { File } from 'src/app/_models/file';
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

  onChange(theFile){
    this.fileToUpload = theFile.target.files;
  }

  FileSubmit(){
     const formData: any = new FormData();
     const file:File = this.fileToUpload;
     formData.append("uploads",file[0]['name']);
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

  ngOnInit() {
  }

}
