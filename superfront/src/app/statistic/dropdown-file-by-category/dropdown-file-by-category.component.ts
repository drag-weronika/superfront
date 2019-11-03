import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileRest } from 'src/app/_models/FileRest';

@Component({
  selector: 'app-dropdown-file-by-category',
  templateUrl: './dropdown-file-by-category.component.html',
  styleUrls: ['./dropdown-file-by-category.component.css']
})
export class DropdownFileByCategoryComponent implements OnInit {

  constructor() { }

  @Input() filesByCategory: FileRest[];
  @Output() selectedByCategory=new EventEmitter<any>();
  @Output() list5=new EventEmitter<any>();

  requestListByCategory(){
      this.list5.emit(null);
  }

  emitSelectedByCategory(val){
      this.selectedByCategory.emit(val);
  }

  ngOnInit() {
  }

}
