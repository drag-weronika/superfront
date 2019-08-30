import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { File } from 'src/app/_models/file';
import { Group } from 'src/app/_models/group';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() selectedFile: File;
  @Input() selectedGroup: Group;
  @Input() selectedCategory;
  @Output() selectedSet=new EventEmitter<any>();


  constructor() { }

  combine() {
    this.selectedSet.emit(null);

  }

  ngOnInit() {
  }

}
