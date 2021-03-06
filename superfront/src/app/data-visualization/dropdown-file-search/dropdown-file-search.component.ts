import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRest } from 'src/app/_models/FileRest';

@Component({
  selector: 'app-dropdown-file-search',
  templateUrl: './dropdown-file-search.component.html',
  styleUrls: ['./dropdown-file-search.component.css']
})
export class DropdownFileSearchComponent implements OnInit {

  constructor() { }
  @Input() files: FileRest[];
  @Output() selectedSet=new EventEmitter<any>();
  @Output() list4=new EventEmitter<any>();

  emitSelectedSet(val: any){
      console.log("emit" + val)
      this.selectedSet.emit(val);
  }

  getName(file: FileRest) {
    return file.fileName + "-" + file.ownerName;
  }

  ngOnInit() {
  }

}
