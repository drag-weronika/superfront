import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HighchartsService } from 'src/app/highcharts.service';
import { PublicationsService }from 'src/app/publications/publications.service';
import { SvgImage } from 'src/app/_models/SvgImage';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, AfterViewInit, OnDestroy {
@ViewChild('dataContainer', {static: false}) dataContainer: ElementRef;
  constructor(private changeDetectionRef: ChangeDetectorRef
               ,private publicationsService:PublicationsService) { }

  comment: string


  ngOnInit() {

    this.publicationsService.getPublishedFile().subscribe(
        (svgImage: SvgImage) => {
           if (svgImage != null) {
            this.dataContainer.nativeElement.innerHTML = svgImage.content
            this.comment = svgImage.comment
           }
        }
    )
  }



  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
  }
}
