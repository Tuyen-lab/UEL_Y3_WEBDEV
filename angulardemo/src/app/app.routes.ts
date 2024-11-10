import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

import { DetailComponent } from './detail/detail.component';
export const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch:'full'},
    {path: "home",component:HomeComponent},
    {path: "login",component:LoginComponent},

    {path: "signup",component:SignupComponent},

    {path: "home/:id",component:DetailComponent},

    
];
