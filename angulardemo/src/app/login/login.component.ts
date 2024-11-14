import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';

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
  userlogin=false
  passlogin=false
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
      if(u.username!= this.logininfo.username){
        this.userlogin=false
      }
      else{
        this.userlogin=true
        if(u.pass!=this.logininfo.pass){
          this.passlogin=false
        }
        else{
          this.passlogin=true
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
        alert('Đăng nhập thành công')
        this.login='yes'
        localStorage.setItem('user',username.value)
        alert(localStorage.getItem('user'))
      }
    }
  }
  }

