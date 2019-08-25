import { Component, OnInit, Input, Output } from '@angular/core';
import { File } from 'src/app/_models/file';

@Component({
  selector: 'app-collapse-menu-file',
  templateUrl: './collapse-menu-file.component.html',
  styleUrls: ['./collapse-menu-file.component.css']
})
export class CollapseMenuFileComponent implements OnInit {

  @Input()files: File[];
  constructor() { }

  ngOnInit() {
  }

}
