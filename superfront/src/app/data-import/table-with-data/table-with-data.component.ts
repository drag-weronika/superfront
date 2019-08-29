import { Component, OnInit, Input} from '@angular/core';
import { Point } from 'src/app/_models/point';
import { File } from 'src/app/_models/file';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-with-data',
  templateUrl: './table-with-data.component.html',
  styleUrls: ['./table-with-data.component.css']
})
export class TableWithDataComponent implements OnInit {

  @Input() fileToUpload: File;

  constructor() { }

  ngOnInit() {
  }

}
