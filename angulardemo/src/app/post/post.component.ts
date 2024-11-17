import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as L from 'leaflet';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  // selectedImage: any | ArrayBuffer | null = null;

  // onImageSelected(event: Event): void {
  //   const fileInput = event.target as HTMLInputElement;

  //   if (fileInput.files && fileInput.files[0]) {
  //     const file = fileInput.files[0];
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       this.selectedImage = e.target?.result;
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

  imgloaded: any
  imgneed: any[]=[]
  images: (any | ArrayBuffer | null)[] = [null, null, null, null, null];
  name=localStorage.getItem('user')
  file: File[] = []
  homestayInfo = {
    ma: "0",
    toado: [0,0],
    chuho: "",
    title: "",
    style:[]  as string[],
    ten: "",
    country: "",
    provin: "",
    city: "",
    ngaynhan: "",
    ngaytra: "",
    gia: "",
    thumnail: "",
    anh:[]  as string[],
    phongngu: "",
    giuong: 0,
    phongtam: 0,
    tiennghi: []  as string[],
    mota: "",
  };
 phi=0
 tong=0

  styleForm = new FormGroup({
    canho: new FormControl(false),
    nha: new FormControl(false),
    bietthu: new FormControl(false),
    khachsan: new FormControl(false),
    nhakhach: new FormControl(false),
    camtraiVR: new FormControl(false),
  });
  tienichForm = new FormGroup({
    wifi: new FormControl(false),
    tv: new FormControl(false),
    bep: new FormControl(false),
    dieuhoa: new FormControl(false),
    maysay: new FormControl(false),
    doxe: new FormControl(false),
    beboi: new FormControl(false),
    thethao: new FormControl(false),
    spa: new FormControl(false),
  });
   SP : any
  errMsg=''
  constructor(private _service: ExampleService, private router: Router, private active: ActivatedRoute){}
  map: L.Map | undefined;
ngOnInit(): void {

  this._service.getSP().subscribe({
    next: (data) => {this.SP = data;
      let max=0
      for(let i of this.SP){
        if(parseInt(i.ma)> max){
          max=parseInt(i.ma)
        }
      }
      
      max=max+1
     
      this.homestayInfo.ma=max.toString()
      this.homestayInfo.chuho= this.name||''
    },
    error: (err) => (this.errMsg= err.message)
    
  })

}
check(x:HTMLInputElement,y:HTMLInputElement){
  this.homestayInfo.toado[0]=parseInt(x.value)
  this.homestayInfo.toado[1]=parseInt(y.value)
  this.initMap()
}
  onImageSelected(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      this.file.push(file);
      reader.onload = (e) => {
        this.images[index] = e.target?.result;
      };

      reader.readAsDataURL(file);
    }
  }


  confirm(){
    this.phi=parseInt(this.homestayInfo.gia)*0.1
    this.tong=this.phi+parseInt(this.homestayInfo.gia)
  }
  onSubmit() {
    this.homestayInfo.gia.toString()
    if (this.styleForm.get('canho')?.value) {
      this.homestayInfo.style.push('Căn hộ');
    
    }
    if (this.styleForm.get('nha')?.value) {
      this.homestayInfo.style.push('Nhà');
    }
    if (this.styleForm.get('bietthu')?.value) {
      this.homestayInfo.style.push('Biệt thự');
    }
    if (this.styleForm.get('khachsan')?.value) {
      this.homestayInfo.style.push('Khách sạn');
    }
    if (this.styleForm.get('nhakhach')?.value) {
      this.homestayInfo.style.push('Nhà khách');
    }
    if (this.styleForm.get('camtraiVR')?.value) {
      this.homestayInfo.style.push('Cắm trái VR');
    }
    if (this.tienichForm.get('wifi')?.value) {
      this.homestayInfo.tiennghi.push('Wifi');
    }
    if (this.tienichForm.get('tv')?.value) {
      this.homestayInfo.tiennghi.push('TV');
    }
    if (this.tienichForm.get('bep')?.value) {
      this.homestayInfo.tiennghi.push('Bếp');
    }
    if (this.tienichForm.get('dieuhoa')?.value) {
      this.homestayInfo.tiennghi.push('Điều hòa');
    }
    if (this.tienichForm.get('maysay')?.value) {
      this.homestayInfo.tiennghi.push('Máy sấy');
    }
    if (this.tienichForm.get('doxe')?.value) {
      this.homestayInfo.tiennghi.push('Đỗ xe miễn phí');
    }
    if (this.tienichForm.get('bebo')?.value) {
      this.homestayInfo.tiennghi.push('Bể bơi');
    }
    if (this.tienichForm.get('thethao')?.value) {
      this.homestayInfo.tiennghi.push('Phòng Thể thao');
    }
    if (this.tienichForm.get('spa')?.value) {
      this.homestayInfo.tiennghi.push('Spa');
    }
    for(let i of this.file){

      this._service.uploadImage(i, this.homestayInfo.ma).subscribe({
        
      });}
    alert('Thêm thành công')
    this._service.getImg().subscribe({
      next: (data) => {
        this.imgloaded = data;
        for (let i of this.imgloaded) {
          if (i.description == this.homestayInfo.ma) {
            this.imgneed.push(i);
          }
        }
        console.log(this.imgloaded)
        console.log(this.imgneed)
        console.log(this.homestayInfo)
        this.homestayInfo.thumnail='http://localhost:3000/upload/'+this.imgneed[0]._id
           
        this.homestayInfo.anh.push('http://localhost:3000/upload/'+this.imgneed[1]._id)
        this.homestayInfo.anh.push('http://localhost:3000/upload/'+this.imgneed[2]._id)
        this.homestayInfo.anh.push('http://localhost:3000/upload/'+this.imgneed[3]._id)
        this.homestayInfo.anh.push('http://localhost:3000/upload/'+this.imgneed[4]._id)
        this.homestayInfo.anh.push('http://localhost:3000/upload/'+this.imgneed[2]._id)
        this.addsp(this.homestayInfo)
        
      },
      error: (err) => {
        console.error('Error occurred while uploading or getting images:', err);
      }})
  

   
   
    
  
  
   
}
initMap(): void {

  this.map = L.map('map', {
    center: [this.homestayInfo.toado[0], this.homestayInfo.toado[1]], // Vị trí ban đầu (latitude, longitude)
    zoom: 13,
    scrollWheelZoom: false // Tắt zoom bằng cuộn chuột
  });

  // Thêm tile layer (bản đồ nền)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);

  // Thêm marker tại vị trí cụ thể
  const marker = L.marker([this.homestayInfo.toado[0], this.homestayInfo.toado[1]]).addTo(this.map);
  marker.bindPopup(this.homestayInfo.ten + " xin chào <br>"+ this.homestayInfo.city +', '+ this.homestayInfo.provin).openPopup();
}

addsp(i: any){

  this._service.addSP(i).subscribe({
    next: (response) =>{
     
      alert('Thêm phòng successfully');
    },
    error: (err) => (this.errMsg= err.message)
  })
}
}



