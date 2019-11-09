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
  numberOfColumns: number;
  chart: any;
  maxNumberOfSeries: number

  myOpts = {
      series: []
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) {
    this.maxNumberOfSeries = 100
    this.numberOfColumns = 0
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
    this.uploadedFile.fileContent.push([])
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
    this.myOpts.series = []

    for (let i=0;i<this.maxNumberOfSeries;i++) {
            this.myOpts.series.push({visible: false,
                                         showInLegend: false,
                                         name: '',
                                         data: []})
    }

    for (let i=0;i<this.numberOfColumns;i++) {
        this.chart.series[i].update(this.myOpts.series[i])
    }

    this.numberOfColumns = allTextLines[0].split(',').length
    for (let i=0;i<this.numberOfColumns;i++) {
        this.uploadedFile.fileContent.push(new Array<Point>())
        this.myOpts.series[i] = {visible: true,
                                 name: '',
                                 data: []}

    }

    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');

        for (let j=0;j<this.numberOfColumns;j++) {
            let point = new Point();
            point.y = data[j];
            this.uploadedFile.fileContent[j].push(point)
            this.myOpts.series[j].data.push(+point.y)
        }
    }
    console.log(this.uploadedFile);
    console.log(this.myOpts)

    if (this.chart == null) {
        this.createCustomChart(this.myOpts);
    }

    for (let i=0;i<this.numberOfColumns;i++) {
        this.chart.series[i].update(this.myOpts.series[i])
    }

  }

  createCustomChart(myOpts: Object) {
    this.chart = this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }
}
