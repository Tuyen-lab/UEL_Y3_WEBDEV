import { Component } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  user={ username:'',pass:'', phone:'',email:'' }
  errMsg: string | null = null;
  name=true
  pass=true
  phone1=true
  email1=true
  nameagain=true
  userwarehouse:any
  constructor(private _service: ExampleService,private activate: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this._service.getuser().subscribe({
      next: (data) => {this.userwarehouse = data},
      error: (err) => (this.errMsg= err.message)
      
    })}
submit(username:HTMLInputElement,pass:HTMLInputElement, phone:HTMLInputElement,email:HTMLInputElement){
  console.log(this.userwarehouse)
  this.user.username=username.value
  this.user.pass=pass.value
  this.user.phone=phone.value
  this.user.email=email.value
  
  if(phone.value==''){
    this.phone1=false

  }
  else{this.phone1=true}

  if(email.value==''){
    this.email1=false
  }
  else{this.email1=true}

  if(username.value==''){
    this.name=false
  }
  else{this.name=true}

  if(pass.value==''){
    this.pass=false
  }
  else{this.pass=true}

 
  if(username.value!='' && pass.value!='' && phone.value!=''&& email.value!=''){
    for(let u of this.userwarehouse){
      if(u.username==username.value){
        this.nameagain=false
        break
      }
      else{
        this.nameagain=true
        
        }
      }
    
    }
    if(this.nameagain==true && this.name==true && this.phone1==true && this.pass==true && this.email1==true ){
      alert('đăng kí thành công')
      
      this._service.adduser(this.user).subscribe({
        next: (response) =>{
          
          alert('Product added successfully');
        },
        error: (err) => (this.errMsg= err.message)
      })
      window.location.href = '/login';
        this.router.navigate(['/login'])
    }
  

}
emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}