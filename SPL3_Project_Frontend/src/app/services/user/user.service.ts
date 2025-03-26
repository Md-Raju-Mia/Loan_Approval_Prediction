import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSingUp } from '../../interfaces/UserSignUp';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl='http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  signup(user:UserSingUp):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  // Method to call the verify API
  verify(payload: { email: string; otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify`, payload);
  }

  // Method to call the login API
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.baseUrl}/login`, payload);
  }


  // Method to call the resend OTP API
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/resend-otp`, { email });
  }



}
