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
          name: 'X',
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
      console.log(this.files);
      })
  }

  selectedChangeHandler (event: number) {
    let fileRest = this.files.filter((item) => item.fileId == event)[0];
    console.log("files " + fileRest)
    this.selectedFile = new File()
    this.selectedFile.fileContent = []
    console.log(event)
    this.selectedFile.fileId = fileRest.fileId;

    this.readCsv(fileRest.content)
  }

  readCsv(content) {
    let allTextLines = content.split(/\r\n/);
    let xFlag = true;
    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        let point = new Point();

        if (data.length == 1) {
            xFlag = false;
            point.y = data[0];
        } else {
            let tarr = [];
            tarr.push(data[0]);
            tarr.push(data[1]);
            point.x = tarr[0];
            point.y = tarr[1];
        }
        this.selectedFile.fileContent.push(point)
    }
    console.log(this.selectedFile);

    this.myOpts.series[0].data = []
    for (let point of this.selectedFile.fileContent) {
        if (xFlag) {
            this.myOpts.series[0].data.push([+point.x, +point.y])
        } else {
            this.myOpts.series[0].data.push([+point.y])
        }
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
