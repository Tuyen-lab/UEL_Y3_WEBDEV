import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute,Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent implements OnInit {
  image1='';
  image2='';
  image3='';
  image4='';
  image5='';
  image6='';
  SP: any
  rental: any
  isPopupOpen = false;
  selectedImage: string | null = null;
  errMsg: string | null = null;
  selectedId: any
  isCollapsed: boolean = true;
  showLimit: number = 500; 
  ngaynhan='';
  isLoggedIn: boolean = false;
  ngaytra ='';
  rental1={manha: '',
    gia:'',
    host: '',
    ngaythue: '',
    ngaytra: '',
    detail: {}}
    startDate='2024-11-01'
  endDate='2024-11-30'
  dateError: boolean = false;
  constructor(private _service: ExampleService,private activate: ActivatedRoute, private router: Router) {}
  id: any
  mota=''
  map: L.Map | undefined;
  

  ngOnInit(): void {
    this.isLoggedIn=this._service.isLoggedIn()
    this._service.getSP().subscribe({
      next: (data) => {this.rental = data;
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data
        if (this.SP && this.SP.length > 1) { 
          this.image1 = this.SP[this.id-1].thumnail;
          this.image2 = this.SP[this.id-1].anh[0];
          this.image3 = this.SP[this.id-1].anh[1];
          this.image4 = this.SP[this.id-1].anh[2];
          this.image5 = this.SP[this.id-1].anh[3];
          this.image6 = this.SP[this.id-1].anh[4];
          this.initMap()
        } 
      
      var formattedText = this.SP[this.id-1].mota.replace(/\n/g, ". ");
      this.mota=formattedText
      this.updateDisplayText();
      },
      
      error: (err) => (this.errMsg= err.message)
    });
  
    this.activate.paramMap.subscribe(param => {
      this.id = param.get('id');
      if (this.id != null) this.selectedId= parseInt(this.id)
    })
    
  }

  openImage(image: string): void {
    this.selectedImage = image;
    this.isPopupOpen = true;
  }

  closeImage(): void {
    this.isPopupOpen = false;
    this.selectedImage = null;
  }
  
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateDisplayText();
  }

  updateDisplayText() {
    if (this.isCollapsed) {
      this.mota = this.SP[this.id-1].mota.slice(0, this.showLimit) + '...';
    } else {
      this.mota = this.SP[this.id-1].mota;
    }
  }
  initMap(): void {

    this.map = L.map('map', {
      center: [this.SP[this.id-1].toado[0], this.SP[this.id-1].toado[1]], // Vị trí ban đầu (latitude, longitude)
      zoom: 13,
      scrollWheelZoom: false // Tắt zoom bằng cuộn chuột
    });

    // Thêm tile layer (bản đồ nền)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Thêm marker tại vị trí cụ thể
    const marker = L.marker([this.SP[this.id-1].toado[0], this.SP[this.id-1].toado[1]]).addTo(this.map);
    marker.bindPopup(this.SP[this.id-1].ten + " xin chào <br>"+ this.SP[this.id-1].city +', '+ this.SP[this.id-1].provin).openPopup();
  }
  
 
  submitData(date1: HTMLInputElement,date2:HTMLInputElement) {
    if(this.isLoggedIn==false){
      alert('Bạn cần đăng nhập để thanh toán')
    }
    else{
      this.rental1.manha=this.SP[this.id-1].ma
      this.rental1.gia=this.SP[this.id-1].gia
      this.rental1.host=this.SP[this.id-1].chuho
      this.rental1.ngaythue=date1.value
      this.rental1.ngaytra=date2.value
      this.rental1.detail=this.SP[this.id-1]
      
    
      
      
    this._service.addrental(this.rental1).subscribe({
        
        next: (response) =>{
          
          alert('Product added successfully');
        },
        error: (err) => (this.errMsg= err.message)
      })
      this.router.navigate([`/home/${this.id}/book`]); // Chuyển đến trang đăng ký
  
    }}
    
  

}



