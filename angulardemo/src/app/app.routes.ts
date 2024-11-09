import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { SignupComponent } from './signup/signup.component';
=======
import { DetailComponent } from './detail/detail.component';
>>>>>>> 4e9cc2a498583d4c36c4a58355e10d87e55f50b3

export const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch:'full'},
    {path: "home",component:HomeComponent},
    {path: "login",component:LoginComponent},
<<<<<<< HEAD
    {path: "signup",component:SignupComponent}
=======
    {path: "home/:id",component:DetailComponent},
>>>>>>> 4e9cc2a498583d4c36c4a58355e10d87e55f50b3
    
];
