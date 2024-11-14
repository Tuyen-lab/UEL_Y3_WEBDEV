import { Component } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  user={ username:'',pass:'', phone:'',email:'' }
  errMsg: string | null = null;
  constructor(private _service: ExampleService,private activate: ActivatedRoute, private router: Router) {}
submit(username:HTMLInputElement,pass:HTMLInputElement, phone:HTMLInputElement,email:HTMLInputElement){
  this.user.username=username.value
  this.user.pass=pass.value
  this.user.phone=phone.value
  this.user.email=email.value
  this._service.adduser(this.user).subscribe({
        
    next: (response) =>{
      
      alert('Product added successfully');
    },
    error: (err) => (this.errMsg= err.message)
  })
}
}
