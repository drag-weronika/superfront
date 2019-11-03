import { Component, OnInit, Input} from '@angular/core';
import { Point } from 'src/app/_models/point';
import { File } from 'src/app/_models/file';


@Component({
  selector: 'app-table-with-data',
  templateUrl: './table-with-data.component.html',
  styleUrls: ['./table-with-data.component.css']
})
export class TableWithDataComponent implements OnInit {

  @Input() fileToUpload1: File;

  constructor() { }

  ngOnInit() {
  }

    range(n: number) {
      let arr = []
      for(let i=0;i<n;i++){
          arr.push(i)
      }
      return arr
    }

}
