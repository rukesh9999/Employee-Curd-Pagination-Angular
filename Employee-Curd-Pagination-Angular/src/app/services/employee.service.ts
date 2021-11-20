import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Designation } from '../models/Designation';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL='http://localhost:8080/api';
  
  constructor(private _http:HttpClient) { 

  }

   
  getEmployees(employee: any):Observable<any>
  {
    
     return this._http.post<any>(this.baseURL+'/all',employee);
  }
  
  getEmployee(id:number):Observable<Employee>
  {
    return this._http.get<Employee>(this.baseURL+'/getEmployee/'+id);
  }
 
  getAllLocations():Observable<Location[]>
  {
    return this._http.get<Location[]>(this.baseURL+'/locations');
  }


   getAllDesignations():Observable<Designation[]>
   {
     return this._http.get<Designation[]>(this.baseURL+'/designations');
   }

 
   saveEmployee(formdata:FormData):Observable<any>
   {
     return this._http.post<any>(this.baseURL+'/saveEmployee',formdata);
   }

   updateEmployee(formdata:FormData):Observable<any>
   {
     return this._http.put<any>(this.baseURL+'/updateEmployee',formdata);
   }


   inactiveEmployee(id:number):Observable<ArrayBuffer>{
    
    return this._http.delete<ArrayBuffer>(this.baseURL+'/inactive/'+id);
   }

   
}
