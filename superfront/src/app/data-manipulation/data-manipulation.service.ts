import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { File } from 'src/app/_models/file';
import { Category } from 'src/app/_models/category';
import { Group } from 'src/app/_models/group';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor(private http: HttpClient) { }

  baseUrl: string="http://localhost:3000/api";

  getFiles(): Observable<File[]>{
    return this.http.get(this.baseUrl+'/files').pipe(map(
    (res:any)=>(res.data as File[])
    ));

  }
  getCategories(): Observable<Category[]>{
     return this.http.get(this.baseUrl+'/categories').pipe(map(
     (res:any)=>(res.data as Category[])
     ));

  }
  getGroup(): Observable<Group[]>{
     return this.http.get(this.baseUrl+'/groups').pipe(map(
     (res:any)=>(res.data as Group[])
     ));

  }

  postSet(set){
     let req = new HttpRequest('POST',this.baseUrl+'/set/${id}',set );
         return this.http.request(req);
  }


}
