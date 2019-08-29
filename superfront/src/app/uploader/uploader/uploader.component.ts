import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { File } from 'src/app/_models/file';
import { Point } from 'src/app/_models/point';
import { HttpEventType,HttpResponse} from '@angular/common/http'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  constructor() { }

  @Output() value1:EventEmitter<File>=new EventEmitter<File>();

  emitValue1(file:File){
      this.value1.emit(file);

  }

  ngOnInit() {
  }

}
