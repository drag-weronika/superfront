import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/_models/group';

@Component({
  selector: 'app-collapse-menu-group',
  templateUrl: './collapse-menu-group.component.html',
  styleUrls: ['./collapse-menu-group.component.css']
})
export class CollapseMenuGroupComponent implements OnInit {

  @Input() groups: Group[];
    @Output() list3=new EventEmitter<any>();
    @Output() selected3=new EventEmitter<any>();

    constructor() { }

    requestList3(){
      console.log("groupReq")
      this.list3.emit(null);
    }

    emitSelected3(val){
      console.log(this.groups)
      console.log("groupEmit")
      this.selected3.emit(val);
    }


  ngOnInit() {
  }

}
