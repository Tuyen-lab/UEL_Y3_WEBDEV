import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newhome',
  standalone: true,
  imports: [],
  templateUrl: './newhome.component.html',
  styleUrl: './newhome.component.css'
})
export class NewhomeComponent {

  constructor(private router: Router) {}

  navigateSearch() {
    this.router.navigate(['/search']); // Chuyển đến trang đăng ký
  }



}
