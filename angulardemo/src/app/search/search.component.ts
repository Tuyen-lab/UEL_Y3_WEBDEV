import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import * as L from 'leaflet';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  key='';
  SP : any
  errMsg=''
  id=''
  price: number = 2500000; // Giá trị slider
  priceRange: string = 'Thấp đến cao'; // Giá trị khoảng giá
  searchQuery: string = ''; // Chuỗi tìm kiếm
  isActive=false
  wish={cus:'loc',manha:'2'}
  searchResult: any[]=[]
  wishlist: any
  notification: string = '';
  constructor(private _service: ExampleService, private router: Router, private active: ActivatedRoute){}
  map: L.Map | undefined;
  ngOnInit(): void {
    this._service.getrWish().subscribe({
      next: (data) => {this.wishlist = data},
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data
        
        this.key = this.active.snapshot.paramMap.get('key')||''; // Lấy giá trị tham số `city` từ URL
        
        for (const p of this.SP) {
          for ( let i in p){
          
          if (typeof p[i] === "string" ) {
            const normalizedValue = this.removeVietnameseTones(p[i]);
            
            if (normalizedValue.includes(this.key)) {
             
                this.searchResult.push(p)
                break;
              
             
            }
          }
          else if(Array.isArray(p[i])){
            for (let d of p[i]){
              console.log(d)
              if (typeof d === "string" ) {
                const normalizedValue1 = this.removeVietnameseTones(d);
                console.log(normalizedValue1)
                
                if (normalizedValue1.includes(this.key)) {
                  
                  this.searchResult.push(p)
                  break;
                }}
            }
          }
         
        }
        
        }
       for(let p of this.searchResult){
     
        if(parseInt(p.gia)<parseInt(localStorage.getItem('gia')||''))
          {
            
            this.searchResult.filter( item => item(parseInt(p.gia)>parseInt(localStorage.getItem('price')||'') ))
          }
       }
      
        if(this.searchResult.length==0){
          this.notification = 'Chưa có chỗ ở nào được cập nhật';
        }
        else{
          this.initMap(); this.notification = '';}
        
        
        
        
      },
      error: (err) => (this.errMsg= err.message)
      
    })
   
    
   
   
  }
  formatPrice(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }
  navigateSearch2(key: string) {


    window.location.href =`/home/search/${key}`
     
    
  
  }
  removeVietnameseTones(str: string): string {
    return str
      .normalize("NFD") // Chuẩn hóa chuỗi
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
      
      .toLowerCase()
      .replace(/đ/g,'d')
  }
  navigateSearch(id: string) {
   
    this.router.navigate([`/home/${id}`]); 
    
  }
  initMap(): void {
    console.log(this.searchResult)
    this.map = L.map('map', {
      center: [this.searchResult[0].toado[0], this.searchResult[0].toado[1]], // Vị trí ban đầu (latitude, longitude)
      zoom: 5,
      scrollWheelZoom: false // Tắt zoom bằng cuộn chuột
    });

    // Thêm tile layer (bản đồ nền)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Thêm marker tại vị trí cụ thể
    this.searchResult.forEach((location) => {
      const marker = L.marker([location.toado[0], location.toado[1]]);
      marker?.addTo(this.map!);
      marker.bindPopup(location.ten + " xin chào <br>" + location.city + ', ' + location.provin);
    });
    
   
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
  filter(){
    localStorage.setItem('price',(this.price/1000).toString())
    localStorage.setItem('pricerange',this.priceRange.toString())
    window.location.reload();
  }
  toggleActive(p: any) {
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
            alert('Product delete successfully');
        
          },
          error: (err) => (this.errMsg= err.message)
        })
      }
  
  
      window.location.reload();
  }}
}