import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HighchartsService } from 'src/app/highcharts.service';
import { PublicationsService }from 'src/app/publications/publications.service';
import { FileRest } from 'src/app/_models/fileRest';
import { File } from 'src/app/_models/file';
import { Point } from 'src/app/_models/point';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('charts', {static: false}) public chartEl: ElementRef;
  myOpts = {
    series: [{
          name: 'X',
          data: []
    }]
  }

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef
               ,private publicationsService:PublicationsService) { }

  publishedFile: File;

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
        this.publishedFile.fileContent[0].push(point)
    }
    console.log(this.publishedFile);

    this.myOpts.series[0].data = []
    for (let point of this.publishedFile.fileContent[0]) {
        this.myOpts.series[0].data.push([+point.x, +point.y])
    }
    console.log(this.myOpts)

    this.createCustomChart(this.myOpts);
  }

  createCustomChart(myOpts: Object) {
    this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }


  ngOnInit() {
    this.publishedFile = new File()
    this.publishedFile.fileContent = []

    this.publicationsService.getPublishedFile().subscribe(
        (fileRest: FileRest) => {
           if (fileRest != null) {
            this.publishedFile.description = fileRest.description;
            console.log(this.publishedFile.description)
            this.readCsv(fileRest.content);
           }
        }
    )
  }



  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
  }
}
