import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  islogin=true
  username=localStorage.getItem('user')
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
   
}
constructor(private router: Router, private service:ExampleService) {}
ngOnInit(){
  this.islogin=this.service.isLoggedIn()
}
gohome(){
  this.router.navigate(['/home'])
}

isActive = false; // Biến để kiểm soát trạng thái
isListVisible = false;

toggleActive() {
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
  this.isListVisible = !this.isListVisible;
}
toLogOut(){
this.service.logout()
alert('Đăng xuất thành công')
window.location.reload()
}
toUser(){
  if(this.username==null){
    
    this.router.navigate(['/login'])
  }
  else{
    this.router.navigate(['/home'])
  }
}
}