import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(private location: Location) { }

  cancel() {
      this.location.back(); // <-- go back to previous location on cancel
    }



  ngOnInit() {
  }

}
