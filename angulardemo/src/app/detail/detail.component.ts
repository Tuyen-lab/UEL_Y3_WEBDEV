import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute,Router } from '@angular/router';
import { FlatpickrDirective, FlatpickrModule } from 'angularx-flatpickr';
import * as L from 'leaflet';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule,  FlatpickrModule],
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
    disabledRanges: { from: string, to: string }[]= [{from:'', to: ''}]
  day1= true
  day2= true
  nha: any
  dateError: boolean = false;
  constructor(private _service: ExampleService,private activate: ActivatedRoute, private router: Router) {}
  id: any
  mota=''
  map: L.Map | undefined;
  dathue: any
  datlai=true
  ngOnInit(): void {
    
    this._service.getSP().subscribe({
      next: (data) => {
        this.SP = data
        if (this.SP && this.SP.length > 1) { 
          for(let i of this.SP){
            if(i.ma==this.id){

          this.image1 = i.thumnail;
          this.image2 = i.anh[0];
          this.image3 = i.anh[1];
          this.image4 = i.anh[2];
          this.image5 = i.anh[3];
          this.image6 = i.anh[4];
          this.nha=i
          console.log(this.nha)
          this.initMap()
          var formattedText = i.mota.replace(/\n/g, ". ");
      this.mota=formattedText
      this.updateDisplayText();
            }
          }
          
        } 
      
      
      },
      
      error: (err) => (this.errMsg= err.message)
    });
    this.isLoggedIn=this._service.isLoggedIn()
    this.activate.paramMap.subscribe(param => {
      this.id = param.get('id');
      if (this.id != null) this.selectedId= parseInt(this.id)
    })
    this._service.getrental().subscribe({
      next: (data) => {this.dathue = data
        for(let i of this.dathue){
          if(i.manha==this.id){
            let a={from: i.ngaythue, to: i.ngaytra}
            this.disabledRanges.push(a)
          }
          if(i.manha==this.id && i.cus==localStorage.getItem('user')){
            this.datlai=false
          }
        }
        
        
      },
      error: (err) => (this.errMsg= err.message)
      
    })

  }
  ngAfterViewInit(): void {
    this.initFlatpickday();
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
initFlatpickday(): void{
  flatpickr('#datepicker', {
    enableTime: true,
    mode: 'range',
    dateFormat: 'Y-m-d',
    disable: this.disabledRanges, // Gán danh sách khoảng ngày
  });
}
  updateDisplayText() {
    if (this.isCollapsed) {
      this.mota = this.nha.mota.slice(0, this.showLimit) + '...';
    } else {
      this.mota = this.nha.mota;
    }
  }
  initMap(): void {

    this.map = L.map('map', {
      center: [this.nha.toado[0], this.nha.toado[1]], // Vị trí ban đầu (latitude, longitude)
      zoom: 13,
      scrollWheelZoom: false // Tắt zoom bằng cuộn chuột
    });

    // Thêm tile layer (bản đồ nền)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Thêm marker tại vị trí cụ thể
    const marker = L.marker([this.nha.toado[0], this.nha.toado[1]]).addTo(this.map);
    marker.bindPopup(this.nha.ten + " xin chào <br>"+ this.nha.city +', '+ this.nha.provin).openPopup();
  }
  
  
  submitData(date1: HTMLInputElement) {

    if(this.isLoggedIn==false){
      alert('Bạn cần đăng nhập để đặt phòng')
    }
    else{
      if(date1.value!=''){
        // Chuyển đến trang đăng ký
      const d1 = new Date(date1.value.substring(0, 10));
    const d2 = new Date(date1.value.slice(-10));

      if (d1.getTime() < d2.getTime()) {
        
        localStorage.setItem('ngaynhan',date1.value.substring(0, 10))
        localStorage.setItem('ngaytra',date1.value.slice(-10))
   
        this.router.navigate([`/home/${this.id}/book`]);
    } else if (d1.getTime() > d2.getTime()) {
        alert("ngày trả phải sau ngày nhận")
    } else {
      alert("ngày trả phải khác ngày nhận")
    }
      }
      else if(date1.value!=''){ 
        this.day1= false
      }
    
      else{
        this.day1= false
        this.day2= false
      }
     
  
    }}
    
  

}



