import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { File } from 'src/app/_models/file';
import { Category } from 'src/app/_models/category';
import { Group } from 'src/app/_models/group';
import { UserRest } from 'src/app/_models/userRest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileRest } from 'src/app/_models/fileRest';


@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {

  constructor(private http: HttpClient) { }

  baseUrl: string="http://localhost:8080/api";

  getFiles(): Observable<FileRest[]>{
    return this.http.get(this.baseUrl+'/files').pipe(map(
        (res)=>{return (res as FileRest[]);}
    ));
  }
  getCategories(): Observable<Category[]>{
     return this.http.get(this.baseUrl+'/categories').pipe(map(
     (res)=>{return (res as Category[]);}
     ));

  }
  getGroups(): Observable<Group[]>{
     return this.http.get(this.baseUrl+'/groups').pipe(map(
     (res)=>{return (res as Group[]);}
     ));

  }

  getUsers(): Observable<UserRest[]>{
      return this.http.get(this.baseUrl+'/usersGroup').pipe(map(
          (res)=>{return (res as UserRest[]);}
      ));
    }

  postSet(set){
     let req = new HttpRequest('POST',this.baseUrl+'/set/${id}',set );
         return this.http.request(req);
  }

   addGroup(group){
         let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
         let options = {
               headers: headers
            };
      console.log(JSON.stringify(group))
       return this.http.post(this.baseUrl, JSON.stringify(group),options);
     }

    addCategory(category){
          let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          let options = {
                headers: headers
             };
       console.log(JSON.stringify(category))
        return this.http.post(this.baseUrl, JSON.stringify(category),options);
    }




}
