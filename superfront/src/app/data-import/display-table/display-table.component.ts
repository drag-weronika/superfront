import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  @Output() valueDisplayTable = new EventEmitter();

  public displayTableEvent(){
  this.valueDisplayTable.emit(null);
  }

  constructor() { }

  ngOnInit() {
   }

}
