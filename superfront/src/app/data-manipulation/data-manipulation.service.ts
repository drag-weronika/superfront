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
    return this.http.get(this.baseUrl+'/files/' + sessionStorage.getItem('username')).pipe(map(
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
      return this.http.get(this.baseUrl+'/users').pipe(map(
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
       return this.http.post(this.baseUrl+'/groups', JSON.stringify(group),options);
     }

    addCategory(category){
          let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          let options = {
                headers: headers
             };
       console.log(JSON.stringify(category))
        return this.http.post(this.baseUrl + '/categories', JSON.stringify(category),options);
    }

    private modals: any[] = [];

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }

  updateFile(fileRest){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let options = {
            headers: headers
         };
      console.log(JSON.stringify(fileRest))
    return this.http.put(this.baseUrl+'/files', JSON.stringify(fileRest),options);
  }

}
