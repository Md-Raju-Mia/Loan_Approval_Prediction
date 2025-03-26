import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(
    private userService: UserService,
    private sessionservice:SessionService, 
    private router: Router,
    private route:ActivatedRoute
  ) {}


  ngOnInit(): void {
      if(this.sessionservice.getUserEmail()){
        this.router.navigate(['/dashboard']);
      }
  }

  login(): void {
    // Validate email and password
    this.emailInvalid = !this.validateEmail(this.email);
    this.passwordInvalid = !this.password;

    if (this.emailInvalid || this.passwordInvalid) {
      return; // Stop if validation fails
    }

    // Call the login API
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login respnse', response);

        if(response.success){
          this.sessionservice.setUserEmail(this.email);
          alert('Login successful!');
          // this.router.navigate(['/dashboard']); // Redirect to dashboard or home page

          // Redirect to the return URL or dashboard
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        }else{
          // Login failed
          alert('Login failed! Please check your email and password or create an account.');
        }
      },
      error: (error) => {
        console.error('Login failed!', error);
        alert('An error occurred. Please try again later.');
      },
    });
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
