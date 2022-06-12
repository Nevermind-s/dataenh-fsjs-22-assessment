import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  getTemplates(){
    return this.http.get('http://localhost:3001/api/analytics');
  }

  constructor(private http:HttpClient) { }
}
