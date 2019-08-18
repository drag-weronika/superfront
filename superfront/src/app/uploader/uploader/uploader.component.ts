import { Component, OnInit } from '@angular/core';
import { UploaderService } from "src/app/uploader/uploader.service";


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  constructor( uploaderService: UploaderService ) { }

   public uploadFile( file: File ) {
        this.uploaderService.uploadFile(file);

   }

  public postOnServer(file: File){
        this.uploaderService.uploadFile(file);
    }

  ngOnInit() {
  }

}
