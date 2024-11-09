import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
constructor(private router: Router) {}
gohome(){
  this.router.navigate(['/home'])
}

isActive = false; // Biến để kiểm soát trạng thái
isListVisible = false;

toggleActive() {
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
  this.isListVisible = !this.isListVisible;
}
}