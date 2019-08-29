import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Point } from 'src/app/_models/point';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataImportService } from 'src/app/data-import/data-import.service';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {

  bindFile(event){

  }

  ngOnInit() {
  }

}
