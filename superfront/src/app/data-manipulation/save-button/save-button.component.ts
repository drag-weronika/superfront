import { Component, OnInit,Input } from '@angular/core';
import { File } from 'src/app/_models/file';
import { Group } from 'src/app/_models/group';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() file: File;
  @Input() group: Group;
  constructor() { }

  combine() {
    /**POST -> this.file.fileId*/

  }

  ngOnInit() {
  }

}
