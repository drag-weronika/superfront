import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-saver',
  templateUrl: './saver.component.html',
  styleUrls: ['./saver.component.css']
})
export class SaverComponent implements OnInit {

  @Output() value3:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  emitValue3(event: any){
      this.value3.emit(event);
  }

  ngOnInit() {
  }

}
