import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,NgIf, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router

  ){
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  signup(): void {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.userservice.signup(user).subscribe({
        next: (response) => {
          
          console.log('Signup response!', response);
          if(response.success){
            alert('Signup successful! Please login.');
            this.router.navigate(['/verify']);
          }else{
            alert('Signup failed! Please try again.');
          }
          
        },
        error: (error) => {
          console.error('Signup failed!', error);
          alert('Signup failed! Please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
