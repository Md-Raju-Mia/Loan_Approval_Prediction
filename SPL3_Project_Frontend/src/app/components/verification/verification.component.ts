import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification',
  imports: [FormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent{
  otp: string = ''; // To store the OTP entered by the user

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
  ) {}


  // Method to verify the OTP
  verifyOtp(): void {
    const email = this.sessionService.getUserEmail(); // Get the email from session storage

    if (email && this.otp) {
      const payload = {
        email: email,
        otp: this.otp,
      };

      // Call the verify API
      this.userService.verify(payload).subscribe({
        next: (response) => {
          console.log('Verification successful!', response);
          alert('Verification successful! You can now login.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Verification failed!', error);
          alert('Verification failed! Please check the OTP and try again.');
        },
      });
    } else {
      alert('Email or OTP is missing. Please try again.');
    }
  }

  // Method to resend the OTP
  resendOtp(): void {
    const email = this.sessionService.getUserEmail(); // Get the email from session storage

    if (email) {
      // Call the resend OTP API (you need to implement this in your backend)
      this.userService.resendOtp(email).subscribe({
        next: (response) => {
          console.log('OTP resent!', response);
          alert('A new OTP has been sent to your email.');
        },
        error: (error) => {
          console.error('Failed to resend OTP!', error);
          alert('Failed to resend OTP. Please try again.');
        },
      });
    } else {
      alert('Email is missing. Please try again.');
    }
  }
}
  


