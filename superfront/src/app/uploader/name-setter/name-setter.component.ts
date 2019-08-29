import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { File } from 'src/app/_models/file';

@Component({
  selector: 'app-name-setter',
  templateUrl: './name-setter.component.html',
  styleUrls: ['./name-setter.component.css']
})
export class NameSetterComponent implements OnInit {

  constructor() { }


  @Output() value2:EventEmitter<string>=new EventEmitter<string>();

  emitValue2(name: string){
     this.value2.emit(name);
  }

  ngOnInit() {
  }

}
