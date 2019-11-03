import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { FileRest } from 'src/app/_models/FileRest';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  baseUrl:string="http://localhost:8080/api";
  constructor(private http:HttpClient) { }

  getPublishedFile(): Observable<FileRest>{
    return this.http.get(this.baseUrl+'/files/publish').pipe(map(
        (res)=>{return (res as FileRest);}
    ));
  }
}
