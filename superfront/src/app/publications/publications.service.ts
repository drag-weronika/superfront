import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { SvgImage } from 'src/app/_models/SvgImage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  baseUrl:string="http://localhost:8080/api";
  constructor(private http:HttpClient) { }

  getPublishedFile(): Observable<SvgImage>{
    return this.http.get(this.baseUrl+'/image').pipe(map(
        (res)=>{return (res as SvgImage);}
    ));
  }
}
