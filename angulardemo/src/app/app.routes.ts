import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';

import { DetailComponent } from './detail/detail.component';
import { BookComponent } from './book/book.component';
import { NewhomeComponent } from './newhome/newhome.component';
import { SearchComponent } from './search/search.component';
export const routes: Routes = [
    {path:'',redirectTo:'/home', pathMatch:'full'},
    {path: "home",component:NewhomeComponent},
    {path: "login",component:LoginComponent},

    {path: "signup",component:SignupComponent},

    {path: "home/:id",component:DetailComponent},
    {path: "home/:id/book", component: BookComponent},
    {path: "home/search/:key", component: SearchComponent},
    {path: "all", component: HomeComponent}

    
];
