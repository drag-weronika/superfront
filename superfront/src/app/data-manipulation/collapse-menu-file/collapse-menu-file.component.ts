import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRest } from 'src/app/_models/fileRest';

@Component({
  selector: 'app-collapse-menu-file',
  templateUrl: './collapse-menu-file.component.html',
  styleUrls: ['./collapse-menu-file.component.css']
})
export class CollapseMenuFileComponent implements OnInit {

  @Input() files: FileRest[];
  @Output() list1=new EventEmitter<any>();
  @Output() selected1=new EventEmitter<any>();

  constructor() { }

  requestList1(){
    console.log("rrrr")
    this.list1.emit(null);
  }

  emitSelected1(val){
    console.log(this.files)
    console.log("asd")
    this.selected1.emit(val);
  }


  ngOnInit() {
  }

}
