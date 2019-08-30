import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Output() plot=new EventEmitter<any>();
  constructor() { }

  createChart(){
    this.plot.emit(null);
  }

  ngOnInit() {
  }

}
