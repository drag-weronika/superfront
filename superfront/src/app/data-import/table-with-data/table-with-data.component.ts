import { Component, OnInit, Input} from '@angular/core';
import { Point } from 'src/app/_models/point';

@Component({
  selector: 'app-table-with-data',
  templateUrl: './table-with-data.component.html',
  styleUrls: ['./table-with-data.component.css']
})
export class TableWithDataComponent implements OnInit {

  @Input() point: Point;
  @Input() points: Point[];

  constructor() { }

  ngOnInit() {
  }

}
