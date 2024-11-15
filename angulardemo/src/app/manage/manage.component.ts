import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {

  currentView: string = 'myRooms';
  constructor (private router: Router){}

  toPost(){
    this.router.navigate(['/post'])
  }

  // Lấy phần tử biểu tượng trái tim

 heartIcon = document.getElementById('heart-icon');

// Kiểm tra nếu phần tử tồn tại
if (heartIcon: any) {
  // Thêm sự kiện mouseenter (khi di chuột vào)
  heartIcon.addEventListener('mouseenter', () => {
    heartIcon.classList.remove('bi-heart'); // Xóa lớp bi-heart (trái tim rỗng)
    heartIcon.classList.add('bi-heart-fill'); // Thêm lớp bi-heart-fill (trái tim đầy)
    
  });

  // Thêm sự kiện mouseleave (khi chuột rời khỏi)
  heartIcon.addEventListener('mouseleave', () => {
    heartIcon.classList.remove('bi-heart-fill'); // Xóa lớp bi-heart-fill
    heartIcon.classList.add('bi-heart'); // Thêm lại lớp bi-heart (trái tim rỗng)
  });
}


}
