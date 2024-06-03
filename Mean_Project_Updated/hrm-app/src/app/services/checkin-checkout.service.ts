import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class CheckInCheckOutService {
  private baseUrl = 'http://localhost:8000/api/checkincheckout';

  constructor(private http: HttpClient) { }

  checkIn(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/checkin`, {});
  }

  checkOut(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/checkout`, {});
  }

  getStatus(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/status`);
  }
}
