import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable,} from 'rxjs'
import {Subject} from 'rxjs'
import{Employee} from '../employee'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
   updateEmp=new Subject();
  constructor(private http:HttpClient) {

   }

 public  Getdata():Observable<Employee[]>{
     return this.http.get<Employee[]>('https://reqres.in/api/users?page=1')
 }

 public  Postdata(emp){
    return this.http.post('https://reqres.in/api/users',emp)
}

 public  Putdata(emp){
    return this.http.put('https://reqres.in/api/users',emp)
}
public  deletedata(emp){
  return this.http.delete('https://reqres.in/api/users',emp)
}

  setupdate(emp){
    this.updateEmp.next(emp);
  }
}
