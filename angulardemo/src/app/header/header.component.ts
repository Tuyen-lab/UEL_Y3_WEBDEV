import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
   
}
constructor(private router: Router, private service: ExampleService) {}
gohome(){
  this.router.navigate(['/home'])
}

isActive = false; // Biến để kiểm soát trạng thái
isListVisible = false;

toggleActive() {
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
  this.isListVisible = !this.isListVisible;
}
toLogOut() {
  this.service.logout()
  alert('Đăng xuất')
}

toHost() {
  this.router.navigate(['/host'])
}


toManage() {
  this.router.navigate(['/manage'])
}



}