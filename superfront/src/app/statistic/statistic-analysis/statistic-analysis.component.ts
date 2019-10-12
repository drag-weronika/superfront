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

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
                             ,private statisticAnalysisService:StatisticAnalysisService) { }

  filesByCategory: FileRest[];
  selectedFile: File;

  fileId: number;

  getFilesByCategory(){
        this.filesByCategory = [];
        this.statisticAnalysisService.getFiles().subscribe(
        (filesByCategory : FileRest[]) => {
            for (let file of filesByCategory) {
                if (file.onlyY) {
                    this.filesByCategory.push(file);
                }
            }
        })
  }

  selectedChangeHandler (event: any) {
    console.log("##" + event)
    this.statisticAnalysisService.getStatisticalData(event).subscribe(
        (data: StatisticalData) => {
            this.myOpts.series[0].data[0].push(data.min)
            this.myOpts.series[0].data[0].push(data.q1)
            this.myOpts.series[0].data[0].push(data.median)
            this.myOpts.series[0].data[0].push(data.q3)
            this.myOpts.series[0].data[0].push(data.max)

            this.createCustomChart(this.myOpts)

            this.histogramOpts.series[1].data = data.data;
            this.createCustomChart2(this.histogramOpts)
        }
    )
  }

    createCustomChart(myOpts: Object) {
      this.hcs.createChart(this.chartEl.nativeElement, myOpts);
    }

    createCustomChart2(myOpts: Object) {
          this.hcs.createChart(this.chartEl2.nativeElement, myOpts);
        }


  ngOnInit() {
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




