import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRest } from 'src/app/_models/fileRest';

@Component({
  selector: 'app-dropdown-file-search',
  templateUrl: './dropdown-file-search.component.html',
  styleUrls: ['./dropdown-file-search.component.css']
})
export class DropdownFileSearchComponent implements OnInit {

  constructor() { }
  @Input() files: FileRest[];
  @Output() selectedSet=new EventEmitter<any>();


  emitSelectedSet(val: any){
      this.selectedSet.emit(val);
  }

  getName(file: FileRest) {
    return file.fileName + "-" + file.ownerName;
  }

  ngOnInit() {
  }

}
