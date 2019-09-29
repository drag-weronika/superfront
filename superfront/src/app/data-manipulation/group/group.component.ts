import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { UserRest } from 'src/app/_models/userRest';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() usersBedzie: UserRest[];
  @Input() userSelectsBedzie: UserRest[];
  @Input() userSelectsString: string;

  show: boolean = false;
  userSelects=[];
  suggestions=[{"id":"001","email":"drag.weronika@gmail.com"},
  {"id":"002","email":"kowalski.jan@op.pl"},
  {"id":"003","email":"rys.jacek@onet.pl"}];

  constructor(private location: Location) { }

  suggest() {
     this.show = true;
  }

   isSelected(s:any) {
      return this.userSelects.findIndex((item) => item.id === s.id) > -1 ? true : false;
     }

     selectSuggestion(s) {
       this.userSelects.find((item) => item.id === s.id) ?
       this.userSelects = this.userSelects.filter((item) => item.id !== s.id) :
       this.userSelects.push(s);
       // this.assignToNgModel();
     }

    deleteSelects(s) {
      this.userSelects = this.userSelects.filter((item) => item.id !== s.id);
      // this.assignToNgModel();
    }
    assignToNgModel() {
      this.userSelectsString = '';
      this.userSelects.map((item) => this.userSelectsString += item.email + ' ');
    }

  cancel() {
      this.location.back(); // <-- go back to previous location on cancel
  }



  ngOnInit() {
  }

}
