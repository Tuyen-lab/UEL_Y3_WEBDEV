import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { flatMap } from 'rxjs';

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
  isActive=false
  wish={cus:'loc',manha:'2'}
  constructor (private router: Router, private _service:ExampleService){}
  house: any
  wishlist: any
  wished: any[]=[]
  wishhouse: any[]=[]

  ngOnInit(): void {
    
    this._service.getrWish().subscribe({
      next: (data) => {this.wishlist = data;
        for(let i of this.wishlist){
          if (i.cus==localStorage.getItem('user')){
              this.wished.push(i)
          }
        }
        console.log(this.wishlist)
        console.log(this.wished)
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getSP().subscribe({
      next: (data) => {
        this.house = data
        for(let i of this.wished){
          console.log(i.manha+'sfdfa')
          for(let p of this.house){
            if(i.manha==p.ma){
              this.wishhouse.push(p)
            }
          }
        }
       
      },
      error: (err) => (this.errMsg= err.message)
      
    })
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
toggleActive() {
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
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
}
