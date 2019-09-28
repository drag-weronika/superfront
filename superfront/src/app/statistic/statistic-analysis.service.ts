import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileRest } from 'src/app/_models/fileRest';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticAnalysisService {

  baseUrl:string="http://localhost:8080/api";
    constructor(private http:HttpClient) { }


  /* TRZEBA PRZEROBIC ZEBY WYBIERAŁO TYLKO Z KATEGORII STATISTIC*/

    getFiles(): Observable<FileRest[]>{
      return this.http.get(this.baseUrl+'/files').pipe(map(
          (res)=>{return (res as FileRest[]);}
      ));
    }


    getSet(id:number){
        return this.http.get(this.baseUrl+'/set/${id}');
      }



}
