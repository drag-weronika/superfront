import { Component, OnInit, Input } from '@angular/core';
import { File } from 'src/app/_models/file';
import { FileRest } from 'src/app/_models/fileRest';
import { DataVisualizationService }from 'src/app/data-visualization/data-visualization.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  description: string;
  @Input() selectedFile: File;
  constructor(private dataVisualizationService:DataVisualizationService, private router: Router){ }

  setDescription(text: any) {
    console.log(this.selectedFile)
    this.description = text;
  }

  shareChartWithDescription() {
    let fileRest = new FileRest();
    fileRest.fileId = this.selectedFile.fileId;
    fileRest.description = this.description;

    this.dataVisualizationService.updateFile(fileRest).subscribe(
        data => {
            this.router.navigateByUrl('/data-visualisation');
        }
    );
  }

  ngOnInit() {
  }

}
