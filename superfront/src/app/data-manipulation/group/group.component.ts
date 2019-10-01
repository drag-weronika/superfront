import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { UserRest } from 'src/app/_models/userRest';
import {DataManipulationService} from 'src/app/data-manipulation/data-manipulation.service';
import { Group } from 'src/app/_models/group';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  users: UserRest[];
  userSelectsString: string;

  show: boolean = false;
  userSelects=[];
  suggestions=[];
  groupName = "";

  constructor(public dataManipulationService: DataManipulationService, private router: Router) { }

  suggest() {
     this.show = true;
  }

   isSelected(s:any) {
      return this.userSelects.findIndex((item) => item.userId === s.userId) > -1 ? true : false;
     }

     selectSuggestion(s) {
       this.userSelects.find((item) => item.userId === s.userId) ?
       this.userSelects = this.userSelects.filter((item) => item.userId !== s.userId) :
       this.userSelects.push(s);
       // this.assignToNgModel();
     }

    deleteSelects(s) {
      this.userSelects = this.userSelects.filter((item) => item.userId !== s.userId);
      // this.assignToNgModel();
    }
    assignToNgModel() {
      this.userSelectsString = '';
      this.userSelects.map((item) => this.userSelectsString += item.email + ' ');
    }

  getUsers(){
    this.dataManipulationService.getUsers().subscribe(
            (users : UserRest[]) => {
            this.users = users;
            this.suggestions = users.filter((item) => item.email !== sessionStorage.getItem('username'))
            })

  }

  setGroupName(name: any){
   this.groupName = name;
  }

  sendGroup(){
    console.log("AAAAAAA")
    let group= new Group();
    group.groupName = this.groupName;
    group.userIds = [];

    for(var i = 0; i < this.userSelects.length; i++) {
      group.userIds.push(this.userSelects[i].userId);
    }

    console.log(this.users.filter((item) => item.email === sessionStorage.getItem('username')))

    group.ownerId = this.users.filter((item) => item.email === sessionStorage.getItem('username'))[0].userId;
    group.userIds.push(group.ownerId)
    this.dataManipulationService.addGroup(group).subscribe(
         data => {
             this.router.navigateByUrl('/data-manipulation');
         }
     );
  }

  ngOnInit() {
    this.getUsers();
  }

}
