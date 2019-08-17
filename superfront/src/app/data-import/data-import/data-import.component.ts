
import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {  Point } from 'src/app/_models/point';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent implements OnInit {

  baseUrl:string = "http://localhost:3000";

  private  points;

  implementTable(){
    this.httpClient.get(this.baseUrl + '/points').subscribe((res : any[])=>{
            console.log(res);
            this.points = res;
            });

  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

}
