import { Component, OnInit, Input } from '@angular/core';
import { SvgImage } from 'src/app/_models/SvgImage';
import { DataVisualizationService }from 'src/app/data-visualization/data-visualization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  description: string;
  publishError: boolean
  publishSuccess: boolean
  @Input() svgContent: string;
  constructor(private dataVisualizationService:DataVisualizationService, private router: Router){
    this.publishError = false
    this.publishSuccess = false
  }

  setDescription(text: any) {
    this.description = text;
  }

  shareChartWithDescription() {
    let svgImage = new SvgImage();
    svgImage.content = this.svgContent
    svgImage.comment = this.description

    this.dataVisualizationService.publishImage(svgImage).subscribe(
        data => {
            this.publishSuccess = true
            this.publishError = false
        },
        error => {
            this.publishError = true;
            this.publishSuccess = false;
        }
    );
  }

  ngOnInit() {
  }

}
