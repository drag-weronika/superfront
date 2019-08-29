import { Component, OnInit, Input} from '@angular/core';
import { File } from 'src/app/_models/file';

@Component({
  selector: 'app-name-setter',
  templateUrl: './name-setter.component.html',
  styleUrls: ['./name-setter.component.css']
})
export class NameSetterComponent implements OnInit {

  constructor() { }

  @Input() fileToUpload: File;

  setName(event:any){
  console.log("ustawiam nazwe");
  this.fileToUpload.fileName=event.target.value;

  }

  ngOnInit() {
  }

}
