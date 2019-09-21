import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HighchartsService } from 'src/app/highcharts.service';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('charts', {static: false}) public chartEl: ElementRef;

  chartsList;
  myCustomOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Stacked bar chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  };

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) {
  }

  public ngAfterViewInit() {
    this.createChart()
  }

  public ngOnDestroy() {
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

  createChart() {
    this.hcs.createChart(this.chartEl.nativeElement);
  }

  createCustomChart(myOpts: Object) {
    this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }

  ngOnInit() {
  }

}
