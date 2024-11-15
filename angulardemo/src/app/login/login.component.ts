import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logininfo={username:'',pass:''}
  userlist: any
  errMsg=''
  userlogin=true
  passlogin=true
  login=''
  isLoggedIn: boolean = false;
  constructor(private _service: ExampleService,private router: Router) {}
  ngOnInit(): void {
    this._service.getuser().subscribe({
      next: (data) => {this.userlist = data},
      error: (err) => (this.errMsg= err.message)
      
    })}
  
  navigateToSignUp() {
    this.router.navigate(['/signup']); // Chuyển đến trang đăng ký
  }
  submit(username: HTMLInputElement, pass:HTMLInputElement){
    this.logininfo.username=username.value
    this.logininfo.pass=pass.value
    for(let u of this.userlist){
      if(u.username!= username.value){
        this.userlogin=false
        
      }
      else{
        this.userlogin=true
        if(u.pass!=pass.value){
          this.passlogin=false
          break
        }
        else{
          this.passlogin=true
          break
        }
      }
    }
    if(this.userlogin==false){
      alert('Tài khoản chưa đăng kí')
    }
    else{
      if(this.passlogin==false){
        alert('sai mật khẩu')
      }
      else{
        localStorage.setItem('user',username.value)
       
        alert('Đăng nhập thành công')
       
        this.login='yes'
        window.location.href = '/home';
        this.router.navigate(['/home'])
 
        
      }
    }
  }
  }

