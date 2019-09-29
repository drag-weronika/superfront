import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy, ViewChild,
  AfterViewInit  } from '@angular/core';
import { Point } from 'src/app/_models/point';
import { File } from 'src/app/_models/file';
import { HighchartsService } from 'src/app/highcharts.service';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-basic-visualization',
  templateUrl: './basic-visualization.component.html',
  styleUrls: ['./basic-visualization.component.css']
})
export class BasicVisualizationComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('charts', {static: true}) public chartEl: ElementRef;

  chartsList;
  uploadedFile: File;

  myOpts = {
      series: [{
          name: '',
          data: []
      }]
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) {
    }

  ngOnInit() {
  }

  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
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

  rmFirst() {
    this.hcs.removeFirst();
    this.changeDetectionRef.detectChanges();
    console.log('rm first', this.hcs.getCharts());
  }


  rmLast() {
    this.hcs.removeLast();
    this.changeDetectionRef.detectChanges();
    console.log('rm last', this.hcs.getCharts());
  }
}
