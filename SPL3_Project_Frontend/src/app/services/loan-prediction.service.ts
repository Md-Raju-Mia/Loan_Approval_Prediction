import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanPredictionService {

  private apiUrl = 'http://127.0.0.1:5000/predict';

   constructor(private http: HttpClient) { }


   predict(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, data, { headers });
  }
   
  
}
