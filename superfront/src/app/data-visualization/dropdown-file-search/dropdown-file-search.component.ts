import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-dropdown-file-search',
  templateUrl: './dropdown-file-search.component.html',
  styleUrls: ['./dropdown-file-search.component.css']
})
export class DropdownFileSearchComponent implements OnInit {

  constructor() { }
  @Output() selectedSet=new EventEmitter<any>();
  @Output() list4=new EventEmitter<any>();

  requestListOfSets(){
    this.list4.emit(null);
  }

  emitSelectedSet(val){
      this.selectedSet.emit(val);
  }

  ngOnInit() {
  }

}
