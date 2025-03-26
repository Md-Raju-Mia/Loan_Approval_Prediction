import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly SESSION_KEY = 'user_email';
  constructor() { }

 // Method to set the user's email in session storage
 setUserEmail(email: string): void {
  sessionStorage.setItem(this.SESSION_KEY, email);
}

// Method to get the user's email from session storage
getUserEmail(): string | null {
  return sessionStorage.getItem(this.SESSION_KEY);
}

// Method to clear the user's email from session storage (logout)
clearUserEmail(): void {
  sessionStorage.removeItem(this.SESSION_KEY);
}

}
