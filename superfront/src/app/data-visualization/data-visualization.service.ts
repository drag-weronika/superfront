import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileRest } from 'src/app/_models/FileRest';
import { SvgImage } from 'src/app/_models/SvgImage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataVisualizationService {

  baseUrl:string="http://localhost:8080/api";
  constructor(private http:HttpClient) { }

  getFiles(): Observable<FileRest[]>{
    return this.http.get(this.baseUrl+'/files/' + sessionStorage.getItem('username')).pipe(map(
        (res)=>{return (res as FileRest[]);}
    ));
  }

  updateFile(fileRest){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = {
            headers: headers
         };
      console.log(JSON.stringify(fileRest))
    return this.http.put(this.baseUrl+'/files', JSON.stringify(fileRest),options);
  }

  publishImage(svgImage){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
        headers: headers
         };
      console.log(JSON.stringify(svgImage))
    return this.http.post(this.baseUrl+'/image', JSON.stringify(svgImage),options);
  }

  getSet(id:number){
    return this.http.get(this.baseUrl+'/set/${id}');
  }

  regression(linearRegression){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = {
            headers: headers
         };
   console.log(JSON.stringify(linearRegression))
    return this.http.post(this.baseUrl+'/statistical/regression', JSON.stringify(linearRegression),options);
  }
}
