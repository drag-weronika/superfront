import { Component, ElementRef, OnInit, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { File } from 'src/app/_models/file';
import { HighchartsService } from 'src/app/highcharts.service';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-basic-visualization',
  templateUrl: './basic-visualization.component.html',
  styleUrls: ['./basic-visualization.component.css']
})
export class BasicVisualizationComponent implements OnInit {
@ViewChild('charts', {static: false}) public chartEl: ElementRef;
  uploadedFile: File;

  myOpts = {
      series: [{
          name: 'Installation',
          data: [[1,2], [2,3], [4,2]]
      }]
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) {
    }

  ngOnInit() {
  }

  onChange(file:any){
    this.uploadedFile = new File();
    this.uploadedFile.fileContent = [];
    this.parseFile(file)
  }

  parseFile(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.readCsv(fileReader.result);
    }
    fileReader.readAsText(file);
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
        this.uploadedFile.fileContent.push(point)
    }
    console.log(this.uploadedFile);

    this.myOpts.series[0].data = []
    for (let point of this.uploadedFile.fileContent) {
        this.myOpts.series[0].data.push([+point.x, +point.y])
    }
    console.log(this.myOpts)
    this.createCustomChart(this.myOpts);
  }

  createCustomChart(myOpts: Object) {
    this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }
}
