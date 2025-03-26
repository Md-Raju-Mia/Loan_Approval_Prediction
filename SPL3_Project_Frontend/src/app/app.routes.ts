import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { VerificationComponent } from './components/verification/verification.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: "", 
        redirectTo: "login", // Redirect empty path to login page
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate:[authGuard]
    },
    {
        path: "loanform",
        component: LoanformComponent,
        canActivate:[authGuard]
    },
    {
        path: "verify",
        component: VerificationComponent
    },
    {
        path: "**", // Wildcard route for invalid URLs
        redirectTo: "login"
    }
   
];
