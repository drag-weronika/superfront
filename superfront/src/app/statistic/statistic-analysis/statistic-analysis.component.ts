import { Component, ElementRef, OnInit, ChangeDetectorRef, OnDestroy, ViewChild,
                      AfterViewInit } from '@angular/core';
import { HighchartsService } from 'src/app/highcharts.service';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/FileRest';
import { Point } from 'src/app/_models/point';
import { StatisticAnalysisService }from 'src/app/statistic/statistic-analysis.service';


@Component({
  selector: 'app-statistic-analysis',
  templateUrl: './statistic-analysis.component.html',
  styleUrls: ['./statistic-analysis.component.css']
})
export class StatisticAnalysisComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('charts', {static: false}) public chartEl: ElementRef;
    myOpts = {
        series: [{
            name: 'Height',
            data: []
        }]
    }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
                             ,private statisticAnalysisService:StatisticAnalysisService) { }

  filesByCategory: FileRest[];
  selectedFile: File;

  fileId: number;

  getFilesByCategory(){
        this.statisticAnalysisService.getFiles().subscribe(
        (filesByCategory : FileRest[]) => { this.filesByCategory = filesByCategory;
        console.log(this.filesByCategory[0].fileName);}
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
      public ngAfterViewInit(){
      }

      public ngOnDestroy() {
      }
 }




