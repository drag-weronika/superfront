import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/_models/category';

@Component({
  selector: 'app-collapse-menu-category',
  templateUrl: './collapse-menu-category.component.html',
  styleUrls: ['./collapse-menu-category.component.css']
})
export class CollapseMenuCategoryComponent implements OnInit {

 @Input() categories: Category[];
     @Output() list2=new EventEmitter<any>();
     @Output() selected2=new EventEmitter<any>();

     constructor() { }

     requestList2(){
       this.list2.emit(null);
     }

     emitSelected2(val){
       this.selected2.emit(val);
     }

  ngOnInit() {
  }

}
