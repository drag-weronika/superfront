import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileRest } from 'src/app/_models/fileRest';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovarianceService {
  baseUrl:string="http://localhost:8080/api";
  constructor(private http:HttpClient) { }

  getFiles(): Observable<FileRest[]>{
    return this.http.get(this.baseUrl+'/files/' + sessionStorage.getItem('username')).pipe(map(
        (res)=>{return (res as FileRest[]);}
    ));
  }

  compute(computationPacket){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = {
            headers: headers
         };
   console.log(JSON.stringify(computationPacket))
    return this.http.post(this.baseUrl+'/statistical/computation', JSON.stringify(computationPacket),options);
  }
}
