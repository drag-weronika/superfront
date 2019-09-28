import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DataVisualizationService }from 'src/app/data-visualization/data-visualization.service';
import { FileRest } from 'src/app/_models/fileRest';
import { File } from 'src/app/_models/file';
import { Point } from 'src/app/_models/point';
import { HighchartsService } from 'src/app/highcharts.service';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('charts', {static: false}) public chartEl: ElementRef;
  myOpts = {
      series: [{
          name: 'Installation',
          data: []
      }]
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
               ,private dataVisualizationService:DataVisualizationService) { }

  files: FileRest[];
  selectedFile: File;

  fileId: number;

  getFilesFromSet(){
      this.dataVisualizationService.getFiles().subscribe(
      (files : FileRest[]) => { this.files = files;
      console.log(this.files[0].fileName);}
      )
  }

  selectedChangeHandler (event: any) {

    this.selectedFile = new File()
    this.selectedFile.fileContent = []

    this.readCsv(event)
  }

  readCsv(content) {
    let allTextLines = content.split(/\r\n/);
    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        let tarr = [];
        tarr.push(data[0]);
        tarr.push(data[1]);
        let point = new Point();
        point.x = tarr[0];
        point.y = tarr[1];
        this.selectedFile.fileContent.push(point)
    }
    console.log(this.selectedFile);

    this.myOpts.series[0].data = []
    for (let point of this.selectedFile.fileContent) {
        this.myOpts.series[0].data.push([+point.x, +point.y])
    }
    console.log(this.myOpts)

    this.createCustomChart(this.myOpts);
  }

  createCustomChart(myOpts: Object) {
    this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }

  ngOnInit() {
  }
    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }

}
