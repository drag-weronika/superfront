import { Component, OnInit } from '@angular/core';
import { DataVisualizationService }from 'src/app/data-visualization/data-visualization.service';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit {

  constructor(private dataVisualizationService:DataVisualizationService) { }

  files: File[];

  /** no tuta myśle o utworzenie tego modelu==clasy set zawierających pola*/
  selectedSet: File;

  getFilesFromSet(){
  /**uzupełnione metodą z servisu: this.dataVisualizationService.getSet().subscribe(
  ()=>{})*/

  }

  selectChangeHandler (event: any) {
          this.selectedSet = event.target.value;
      }


  ngOnInit() {
  }

}
