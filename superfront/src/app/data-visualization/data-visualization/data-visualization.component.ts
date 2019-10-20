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
  }

  files: FileRest[];
  selectedFile: File;
  chart: any;
  fileId: number;
  maxNumberOfSeries: number

  getFilesFromSet(){
      this.dataVisualizationService.getFiles().subscribe(
      (files : FileRest[]) => { this.files = files;
      console.log(this.files);
      })
  }

  selectedChangeHandler (event: number) {
    if (this.selectedFile != null) {
        for(let i=0;i< this.selectedFile.fileContent.length;i++) {
            this.chart.series[i].update(this.drawEmptyChart())
        }
    }


    let fileRest = this.files.filter((item) => item.fileId == event)[0];
    console.log("files " + fileRest)
    this.selectedFile = new File()
    this.selectedFile.fileContent = []
    console.log(event)
    this.selectedFile.fileId = fileRest.fileId;

    this.readCsv(fileRest.content)
  }

  readCsv(content) {
    let allTextLines = content.split(/\r\n|\n/);
    let xFlag = true;

    let numberOfColumns = allTextLines[0].split(',').length
    for (let i=0;i<numberOfColumns-1;i++) {
        this.selectedFile.fileContent.push(new Array<Point>())
    }

    if (this.selectedFile.fileContent.length == 0) {
        this.selectedFile.fileContent.push(new Array<Point>())
    }

    console.log("number of columns " + numberOfColumns)
    console.log("file content size " + this.selectedFile.fileContent.length)

    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');


        if (data.length == 1) {
            let point = new Point();
            xFlag = false;
            point.y = data[0];
            this.selectedFile.fileContent[0].push(point)
        } else {
            for (let j=1;j<numberOfColumns;j++) {
                let point = new Point();
                let tarr = [];
                tarr.push(data[0]);
                tarr.push(data[j]);
                point.x = tarr[0];
                point.y = tarr[1];
                console.log(point)
                console.log(j-1)
                this.selectedFile.fileContent[j-1].push(point)
            }
        }

    }
    console.log(this.selectedFile);

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

    console.log(this.myOpts)

  }

  modeError() {
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

  modeAll() {
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
  }
  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
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
                                        type: 'pie',
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
