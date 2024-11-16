import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  name=localStorage.getItem('user')
  SP: any
  rented: any[]=[]
  errMsg=''
  currentView: string = 'myRooms';
  constructor (private router: Router, private _service:ExampleService){}
  ngOnInit(): void {
    this._service.getrental().subscribe({
      next: (data) => {this.SP = data;
        for(let i of this.SP){
          if (i.cus==this.name){
            this.rented.push(i.detail)
          }
        }
      },
      error: (err) => (this.errMsg= err.message)
      
    })}
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
OnitemClick(p: any){
  for(let i of this.SP){
    if( i.ma==p.manha){
      localStorage.removeItem('chixem');
      localStorage.setItem('ngaynhan',i.ngaythue)
      localStorage.setItem('ngaytra',i.ngaytra)
    }
  }
  
  this.router.navigate (['/manage',p.ma])
}

}
