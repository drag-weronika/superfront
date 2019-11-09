import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy, ViewChild,
                      AfterViewInit } from '@angular/core';
import { HighchartsService } from 'src/app/highcharts.service';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/FileRest';
import { Point } from 'src/app/_models/point';
import { StatisticalData } from 'src/app/_models/StatisticalData';
import { StatisticAnalysisService }from 'src/app/statistic/statistic-analysis.service';


@Component({
  selector: 'app-statistic-analysis',
  templateUrl: './statistic-analysis.component.html',
  styleUrls: ['./statistic-analysis.component.css']
})
export class StatisticAnalysisComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('charts', {static: false}) public chartEl: ElementRef;
  @ViewChild('charts2', {static: false}) public chartEl2: ElementRef;

  filesByCategory: FileRest[];
  selectedFile: File;
  columnId: any;
  fileId: number;
  binNumberChoice: string;
  chart1: any;
  chart2: any;
  binsNumberVar: any
  binNumber: number

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
                             ,private statisticAnalysisService:StatisticAnalysisService) {
    this.binNumberChoice = 'square-root';
    this.binsNumberVar = 'square-root'
    this.binNumber = 2
  }


  getFilesByCategory(){
        this.filesByCategory = [];
        this.statisticAnalysisService.getFiles().subscribe(
        (filesByCategory : FileRest[]) => {
            for (let file of filesByCategory) {
                this.filesByCategory.push(file);
            }
        })
  }

  selectedBinNumberChangeHandler(event: any) {
    this.binNumberChoice = event
  }

  selectedChangeHandler (event: any) {
    this.fileId = event
  }

    createCustomChart(myOpts: any) {
      if (this.chart1 == null) {
        this.chart1 = this.hcs.createChart(this.chartEl.nativeElement, myOpts);
      } else {
        this.chart1.series[0].update(myOpts.series[0])
      }
      console.log(this.chart1.series)
    }

    createCustomChart2(myOpts: any) {
      if (this.chart2 == null) {
        this.chart2 = this.hcs.createChart(this.chartEl2.nativeElement, myOpts);
      } else {
        this.chart2.series[1].update(myOpts.series[1])
        this.chart2.series[0].update(myOpts.series[0])
      }
    }

  submit() {
     this.statisticAnalysisService.getStatisticalData(this.fileId, this.columnId).subscribe(
        (data: StatisticalData) => {
            this.myOpts.series[0].data[0] = []
            this.myOpts.series[0].data[0].push(data.min)
            this.myOpts.series[0].data[0].push(data.q1)
            this.myOpts.series[0].data[0].push(data.median)
            this.myOpts.series[0].data[0].push(data.q3)
            this.myOpts.series[0].data[0].push(data.max)

            this.createCustomChart(this.myOpts)

            this.histogramOpts.series[1].data = data.data;
            console.log('set to ' + this.binNumberChoice)

            if (this.binNumberChoice === 'custom') {
                this.binsNumberVar = this.binNumber
            } else {
                this.binsNumberVar = this.binNumberChoice
            }

            this.histogramOpts.series[0] = {
                                                                       name: 'Histogram',
                                                                       type: 'histogram',
                                                                       binsNumber: this.binsNumberVar,
                                                                       xAxis: 1,
                                                                       yAxis: 1,
                                                                       baseSeries: 's1',
                                                                       zIndex: -1
                                                                   }

            console.log(this.histogramOpts)
            this.createCustomChart2(this.histogramOpts)
        }
    )
  }

  ngOnInit() {
  this.columnId = 1;
  this.getFilesByCategory()
  }
      public ngAfterViewInit(){
      }

      public ngOnDestroy() {
      }

    myOpts = {
        chart: {
            type: 'boxplot'
        },

        title: {
            text: 'Highcharts Box Plot Example'
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Observations',
            data: [
              []
            ]
        }]
    }



    histogramOpts = {
                        title: {
                            text: 'Highcharts Histogram'
                        },
                        xAxis: [{
                            title: { text: 'Data' },
                            alignTicks: false
                        }, {
                            title: { text: 'Histogram' },
                            alignTicks: false,
                            opposite: true
                        }],

                        yAxis: [{
                            title: { text: 'Data' }
                        }, {
                            title: { text: 'Histogram' },
                            opposite: true
                        }],

                        series: [{
                            name: 'Histogram',
                            type: 'histogram',
                            binsNumber: this.binsNumberVar,
                            xAxis: 1,
                            yAxis: 1,
                            baseSeries: 's1',
                            zIndex: -1
                        }, {
                            name: 'Data',
                            type: 'scatter',
                            data: [],
                            id: 's1',
                            marker: {
                                radius: 1.5
                            }
                        }]
                    }
 }




