import { Component, OnInit } from '@angular/core';

import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { File } from 'src/app/_models/file';

@Component({
  selector: 'app-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.css']
})
export class DataManipulationComponent implements OnInit {
  file; File;
  files: File[];
  constructor(public dataManipulationService: DataManipulationService ) { }

  getFilesNames(){
  }

  ngOnInit() {
  }

}
