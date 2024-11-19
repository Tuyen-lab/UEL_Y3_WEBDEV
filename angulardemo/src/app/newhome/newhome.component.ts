import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import e from 'cors';

@Component({
  selector: 'app-newhome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newhome.component.html',
  styleUrl: './newhome.component.css'
})
export class NewhomeComponent {

  constructor(private router: Router, private _service: ExampleService,  private active: ActivatedRoute) {}
  keyword=''
  SP : any
  wishlist: any
  isActive: string[]=[]
  wish={cus:'loc',manha:'2'}
  errMsg=''
  selectedId: any
  giamgia=0
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data.slice(0, 4)},
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getrWish().subscribe({
      next: (data) => {this.wishlist = data;
        for(let i of this.wishlist){{
          if(i.manha==localStorage.getItem('user')){
            this.isActive.push(i.manha)
          }
        }}
      },
      error: (err) => (this.errMsg= err.message)
      
    })}
  
  navigateSearch(key: string) {

    this.keyword=key
    
    this.router.navigate([`/home/search/${key}`]); 
    
  }
  removeVietnameseTones(str: HTMLInputElement): void {
    this.keyword= str.value
      .normalize("NFD") // Chuẩn hóa chuỗi
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
      
      .toLowerCase()
      .replace(/đ/g,'d')
      this.router.navigate([`/home/search/${this.keyword}`]);
  }
  giam(gia:string) {
    this.giamgia=parseInt(gia)*75/100*1000000
    return this.giamgia
    
  }
  OnitemClick(p: any){
    this.router.navigate (['/home',p.ma])
  }
  all(){
    this.router.navigate (['/all'])
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
  toggleActive(p: any) {
    if(localStorage.getItem('user')==null){
      alert('bạn phải đăng nhập trước')
    }
    else{
    this.wish.cus=localStorage.getItem('user')||''
    this.wish.manha=p.ma

    if(!this.check(p))
      {
        this.isActive.push(p.ma)
        this._service.addwish(this.wish).subscribe({
    
          next: (response) =>{
            alert('Product added successfully');
          },
          error: (err) => (this.errMsg= err.message)
        })
      }
      else{
        this.isActive.filter(item => item !== p.ma)
        this._service.deleteWish(this.wish.cus,this.wish.manha).subscribe({
      
          next: (response) =>{
    
        
          },
          error: (err) => (this.errMsg= err.message)
        })
        
      }
      window.location.reload();
  
     
  }}
}
