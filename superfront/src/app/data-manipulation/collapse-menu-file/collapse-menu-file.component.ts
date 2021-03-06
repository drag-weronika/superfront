import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRest } from 'src/app/_models/FileRest';

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
    this.list1.emit(5);
  }

  emitSelected1(val){
    this.selected1.emit(val);
  }


  ngOnInit() {
  }

}
