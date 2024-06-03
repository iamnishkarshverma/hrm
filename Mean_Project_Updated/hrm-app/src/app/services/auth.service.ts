import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  // isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email: string) {
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, { email: email });
  }

  resetPasswordService(resetObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  employeeDetailService(empObj: any) {
    return this.http.get<any>(`${apiUrls.authServiceApi}getAllEmployees`, empObj);
  }

  isLoggedIn() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("employee_id");
    } else {
      // Handle the case when localStorage is not available
      return false;
    }
  }

}
