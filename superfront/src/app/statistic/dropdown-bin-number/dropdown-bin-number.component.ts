import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-bin-number',
  templateUrl: './dropdown-bin-number.component.html',
  styleUrls: ['./dropdown-bin-number.component.css']
})
export class DropdownBinNumberComponent implements OnInit {

  @Output() selectedBinNumber=new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  emitSelectedBinNumber(val){
    this.selectedBinNumber.emit(val);
  }

}
