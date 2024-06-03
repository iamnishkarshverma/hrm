import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getEmployeeById(id: string) {
    return this.http.get<any>(`${apiUrls.employeeServiceApi}${id}`);
  }

}
