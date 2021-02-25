import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'https://localhost:5001/api';
  readonly PhotoUrl = 'https://localhost:5001/Photos';
  readonly DepartmentUrl = `${this.APIUrl}/department`;
  readonly EmployeeUrl = `${this.APIUrl}/employee`;

  constructor(private http:HttpClient) { }

  getImagesUrl() : string {
    return this.PhotoUrl;
  }

  /*
    Department Routes
  */

  getDepartmentList():Observable<any[]>{
    return this.http.get<any>(this.DepartmentUrl);
  }

  addDepartment(val:any) {
    return this.http.post(this.DepartmentUrl, val);
  }

  updateDepartment(val:any) {
    return this.http.put(this.DepartmentUrl, val);
  }

  deleteDepartment(val:any) {
    const url = `${this.DepartmentUrl}/${val}`;
    return this.http.delete(url);
  }

  /*
    Employee Routes
  */

  getEmployeeList():Observable<any[]>{
    return this.http.get<any>(this.EmployeeUrl);
  }

  addEmployee(val:any) {
    return this.http.post(this.EmployeeUrl, val);
  }

  updateEmployee(val:any) {
    return this.http.put(this.EmployeeUrl, val);
  }

  deleteEmployee(val:any) {
    const url = `${this.EmployeeUrl}/${val}`;
    return this.http.delete(url);
  }

  UploadPhoto(val:any) {
    const url = `${this.EmployeeUrl}/savefile`;
    return this.http.post(url, val);
  }
}
