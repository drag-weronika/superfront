import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DataVisualizationService }from 'src/app/data-visualization/data-visualization.service';
import { FileRest } from 'src/app/_models/FileRest';
import { File } from 'src/app/_models/file';
import { LinearRegression } from 'src/app/_models/LinearRegression';
import { Point } from 'src/app/_models/point';
import { HighchartsService } from 'src/app/highcharts.service';

enum Mode {
    ALL, SINGLE, ERROR_BARS
}

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('charts', {static: false}) chartEl: ElementRef
  myOpts = {
      exporting: { enabled: false },
      plotOptions: {
        series: {
         pointStart: 1
        }
      },
      series: []
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
               ,private dataVisualizationService:DataVisualizationService) {
    this.maxNumberOfSeries = 100;
    this.regression = false;
  }

  regression: boolean;
  files: FileRest[];
  selectedFile: File;
  chart: any;
  fileId: number;
  maxNumberOfSeries: number
  slope: number
  intercept: number
  viewMode: string
  dataMode: Mode
  numberOfColumns: number
  numberOfColumnsInTable: number

  getFilesFromSet(){
      this.regression = false;
      this.dataVisualizationService.getFiles().subscribe(
      (files : FileRest[]) => { this.files = files;
      console.log(this.files);
      })
  }

  range(n: number) {
    let arr = []
    for(let i=0;i<n;i++){
        arr.push(i)
    }
    return arr
  }

  selectedChangeHandler (event: number) {
  this.regression = false;
    if (this.selectedFile != null) {
        for(let i=0;i< this.selectedFile.fileContent.length;i++) {
            this.chart.series[i].update(this.drawEmptyChart())
        }
        this.chart.series[1].update(this.drawEmptyChart())
    }

    let linearRegression = new LinearRegression()
    linearRegression.firstColumnId = 1
    linearRegression.secondColumnId = 2
    linearRegression.fileId = event

    this.dataVisualizationService.regression(linearRegression).subscribe(
        r => {
            this.slope = (r as LinearRegression).slope
            this.intercept = (r as LinearRegression).intercept
        }
    )

    let fileRest = this.files.filter((item) => item.fileId == event)[0];

    this.selectedFile = new File()
    this.selectedFile.fileContent = []

    this.selectedFile.fileId = fileRest.fileId;

    this.readCsv(fileRest.content)
  }

  readCsv(content) {
    let allTextLines = content.split(/\r\n|\n/);
    let xFlag = true;

    this.numberOfColumns = allTextLines[0].split(',').length
    for (let i=0;i<this.numberOfColumns-1;i++) {
        this.selectedFile.fileContent.push(new Array<Point>())
    }

    if (this.selectedFile.fileContent.length == 0) {
        this.selectedFile.fileContent.push(new Array<Point>())
    }

    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');


        if (data.length == 1) {
            let point = new Point();
            xFlag = false;
            point.y = data[0];
            this.selectedFile.fileContent[0].push(point)
        } else {
            for (let j=1;j<this.numberOfColumns;j++) {
                let point = new Point();
                let tarr = [];
                tarr.push(data[0]);
                tarr.push(data[j]);
                point.x = tarr[0];
                point.y = tarr[1];
                this.selectedFile.fileContent[j-1].push(point)
            }
        }

    }

    this.myOpts.series = []
    let pointStart = Math.round(this.selectedFile.fileContent[0][0].x)
    if (Number.isNaN(pointStart)) {
       pointStart = 0
    }
    this.myOpts.plotOptions.series.pointStart = pointStart
    let numberOfSeries = this.selectedFile.fileContent.length



    if (this.chart == null) {
        for (let i=0;i<this.maxNumberOfSeries;i++) {
                this.myOpts.series.push({visible: false,
                                         showInLegend: false})
        }
        this.createCustomChart(this.myOpts);
    } else {
    }

    this.chart.series[0].update(this.drawChartFromSelectedFile(0))
    this.dataMode = Mode.SINGLE
    this.numberOfColumnsInTable = 2
  }

  modeSingle() {
  this.regression = false;
    this.numberOfColumnsInTable = 2
    this.dataMode = Mode.SINGLE
    if (this.selectedFile.fileContent == null) {
        return
    }
    this.chart.series[0].update(this.drawChartFromSelectedFile(0))

    let numberOfSeries = this.selectedFile.fileContent.length
    for(let i=1;i< numberOfSeries;i++) {
        this.chart.series[i].update(this.drawEmptyChart())
    }
    if (this.chart.series[1]) {
        this.chart.series[1].update(this.drawEmptyChart())
    }
  }

  modeError() {
  this.regression = false;
    if (this.viewMode == 'table') {
        this.modeAll()
    }
    if (this.numberOfColumns < 3) {
        this.numberOfColumnsInTable = 2
    } else {
        this.numberOfColumnsInTable = 3
    }

    this.dataMode = Mode.ERROR_BARS
    if (this.viewMode == 'chart') {
        if (this.selectedFile.fileContent == null) {
            return
        }
        this.chart.series[0].update(this.drawChartFromSelectedFile(0))
        this.chart.series[1].update(this.drawErrorBars())

        let numberOfSeries = this.selectedFile.fileContent.length
        for(let i=2;i< numberOfSeries;i++) {
            this.chart.series[i].update(this.drawEmptyChart())
        }
    }
  }

  modeRegression() {
    this.regression = true;
    this.numberOfColumnsInTable = 2
    this.dataMode = Mode.SINGLE
    if (this.selectedFile.fileContent == null) {
        return
    }
    this.chart.series[0].update(this.drawChartFromSelectedFile(0))
    this.chart.series[1].update(this.drawLinearRegression())

    let numberOfSeries = this.selectedFile.fileContent.length
    for(let i=2;i< numberOfSeries;i++) {
        this.chart.series[i].update(this.drawEmptyChart())
    }
  }

  modeAll() {
  this.regression = false;
    this.numberOfColumnsInTable = Math.max(this.numberOfColumns, 2)
    this.dataMode = Mode.ALL
    if (this.selectedFile.fileContent == null) {
        return
    }

    let numberOfSeries = this.selectedFile.fileContent.length
    for(let i=0;i< numberOfSeries;i++) {
        this.chart.series[i].update(this.drawChartFromSelectedFile(i))
    }
  }

  createCustomChart(myOpts: Object) {
    this.chart = this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }

  exportAsPNG() {
    if (this.chart) {
        this.chart.exportChart();
    }
  }

  exportAsPDF() {
    if (this.chart) {
        this.chart.exportChart({type: 'application/pdf'});
    }
  }

  ngOnInit() {
    this.getFilesFromSet();
    this.viewMode = 'chart'
  }
  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
  }

  changeView() {
    if (this.viewMode == 'chart') {
        this.viewMode = 'table'
        if (this.dataMode == Mode.ERROR_BARS) {
            this.modeAll()
            this.dataMode = Mode.ERROR_BARS
            if (this.numberOfColumns < 3) {
                this.numberOfColumnsInTable = 2
            } else {
                this.numberOfColumnsInTable = 3
            }
        }
    } else {
        this.viewMode = 'chart'
        this.changeDetectionRef.detectChanges();
        if (this.myOpts.series.length == 0) {
            for (let i=0;i<this.maxNumberOfSeries;i++) {
                this.myOpts.series.push({visible: false,
                                         showInLegend: false})
            }
        }

        this.createCustomChart(this.myOpts)
        if (this.dataMode == Mode.ALL) {
            this.modeAll()
        } else if (this.dataMode == Mode.SINGLE) {
            this.modeSingle()
        } else if (this.dataMode == Mode.ERROR_BARS) {
            this.modeError()
        }
    }
  }

  drawChartFromSelectedFile(id: number) {
      let pointStart = Math.round(this.selectedFile.fileContent[0][0].x)
      if (Number.isNaN(pointStart)) {
        pointStart = 0
      }
      let newData = []
      let series = {
                                        pointStart: pointStart,
                                        visible: true,
                                        name: id,
                                        type: 'line',
                                        data: newData
                                    }
      for (let point of this.selectedFile.fileContent[id]) {
          if (point.x != null) {
              newData.push([+point.x, +point.y])
          } else {
              newData.push([+point.y])
          }
      }
      return series
  }

  drawLinearRegression() {
      let pointStart = Math.round(this.selectedFile.fileContent[0][0].x)
      if (Number.isNaN(pointStart)) {
        pointStart = 0
      }
      let newData = []
      let series = {
                                        pointStart: pointStart,
                                        visible: true,
                                        name: 'regression',
                                        type: 'line',
                                        data: newData
                                    }

      let point = new Point()
      point.x = this.selectedFile.fileContent[0][0].x
      if (point.x == null) {
        point.x = pointStart
      }
      point.y = this.slope*point.x + this.intercept
      newData.push([+point.x, +point.y])

      let numberOfPoints = this.selectedFile.fileContent[0].length
      point = new Point()
      point.x = this.selectedFile.fileContent[0][numberOfPoints-1].x
      if (point.x == null) {
        point.x = numberOfPoints-1
      }
      point.y = this.slope*point.x + this.intercept
      newData.push([+point.x, +point.y])


      return series
  }

  drawErrorBars() {
      if (this.selectedFile.fileContent.length < 2) {
        return this.drawEmptyChart()
      }
      let pointStart = Math.round(this.selectedFile.fileContent[0][0].x)
      if (Number.isNaN(pointStart)) {
        pointStart = 0
      }
      let newData = []
      let series = {                            pointStart: pointStart,
                                                visible: true,
                                                name: "byleco",
                                                type: 'errorbar',
                                                data: newData
                                            }

      let values = this.selectedFile.fileContent[0]
      let errors = this.selectedFile.fileContent[1]
      for (let it = 0; it < this.selectedFile.fileContent[1].length;it++) {
          newData.push([+values[it].x, values[it].y - errors[it].y/2, +values[it].y + errors[it].y/2])
      }

      return series;
  }

  drawEmptyChart() {
    return {visible: false,
            showInLegend: false}
  }



}
