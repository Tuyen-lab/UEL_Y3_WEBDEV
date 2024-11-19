import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router , RouterOutlet } from '@angular/router';
import { ExampleService } from '../service/sp.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  SP : any
  errMsg=''
  isActive=true
  wish={cus:'loc',manha:'2'}
  selectedId: any
  wishlist: any
  constructor(private _service: ExampleService,private cdr: ChangeDetectorRef, private router: Router, private active: ActivatedRoute){}
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data},
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getrWish().subscribe({
      next: (data) => {this.wishlist = data},
      error: (err) => (this.errMsg= err.message)
      
    })
    this.active.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id != null) this.selectedId = parseInt(id);
    })
}
onActive(p:any){
  return p.id == this.selectedId;
}
OnitemClick(p: any){
  this.router.navigate (['/home',p.ma])
}
toggleActive() {

  if(this.isActive)
    {
      this._service.addwish(this.wish).subscribe({
  
        next: (response) =>{
          alert('Product added successfully');
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
    else{
      this._service.deleteWish(this.wish.cus,this.wish.manha).subscribe({
    
        next: (response) =>{
          alert('Product delete successfully');
      
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
}
check(p: any): boolean {
  this.wish.cus=localStorage.getItem('user')||''
  this.wish.manha=p.ma
  for (let i of this.wishlist) {
    console.log(i.manha + i._id)
    console.log(p.ma)
      if (i.manha == p.ma && i.cus == localStorage.getItem('user')) {
          return true;
      } 
   
  }
  return false;
 
 

}
toggleActive2(p: any) {
  if(localStorage.getItem('user')==null){
    alert('bạn phải đăng nhập trước')
  }
  else{
  this.wish.cus=localStorage.getItem('user')||''
  this.wish.manha=p.ma
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
  if(!this.check(p))
    {
      this._service.addwish(this.wish).subscribe({
  
        next: (response) =>{
          alert('Product added successfully');
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
    else{
      this._service.deleteWish(this.wish.cus,this.wish.manha).subscribe({
    
        next: (response) =>{
 
      
        },
        error: (err) => (this.errMsg= err.message)
      })
    }


    window.location.reload();
}}
}
