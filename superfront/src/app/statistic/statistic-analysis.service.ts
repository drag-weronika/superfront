import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileRest } from 'src/app/_models/fileRest';
import { map } from 'rxjs/operators';
import { StatisticalData } from 'src/app/_models/StatisticalData';

@Injectable({
  providedIn: 'root'
})
export class StatisticAnalysisService {

  baseUrl:string="http://localhost:8080/api";
    constructor(private http:HttpClient) { }

    getFiles(): Observable<FileRest[]>{
      return this.http.get(this.baseUrl+'/files/' + sessionStorage.getItem('username')).pipe(map(
          (res)=>{return (res as FileRest[]);}
      ));
    }

    getStatisticalData(id:number) {
        return this.http.get(this.baseUrl+'/statistical/' + id);
    }


    getSet(id:number){
        return this.http.get(this.baseUrl+'/set/${id}');
      }



}
