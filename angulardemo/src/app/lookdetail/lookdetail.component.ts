import { CommonModule } from '@angular/common';
import { Component, OnInit ,HostListener} from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute,Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lookdetail.component.html',
  styleUrl: './lookdetail.component.css'
})

export class LookDetailComponent implements OnInit {
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
  rented: any
  rental1={manha: '',
    gia:'',
    host: '',
    ngaythue: '',
    ngaytra: '',
    cus:'',
    detail: {}}
  day1= true
  day2= true
  nhadathue:any
  chixem=''
  dateError: boolean = false;
  comment: any
  usercomment: any[]=[]
  isVisible = true;
  constructor(private _service: ExampleService,private activate: ActivatedRoute, private router: Router) {}
  id: any
  mota=''
  map: L.Map | undefined;
  nha: any
  sao=0
  
  ngOnInit(): void {
    this._service.getComment().subscribe({
      next: (data) => {this.comment = data
        for(let i of this.comment){
          if(i.manha==this.id){
            this.usercomment.push(i)
            this.sao+=i.sao
          }
        }
        this.sao=this.sao/this.usercomment.length
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this.isLoggedIn=this._service.isLoggedIn()
    this.ngaynhan=localStorage.getItem('ngaynhan')||''
    this.chixem=localStorage.getItem('chixem')||''
    this.ngaytra=localStorage.getItem('ngaytra')||''
    this._service.getrental().subscribe({
      next: (data) => {this.rented = data
        console.log(this.rented)

        for(let i of this.rented){
        if(i.manha==this.id){
        this.rental1.manha=i.manha
        this.rental1.host=i.host
        this.rental1.gia=i.gia
        this.rental1.cus=i.cus
        this.rental1.ngaythue=i.ngaythue
        this.rental1.ngaytra=i.ngaytra
        this.rental1.detail=i.detail
       
        this.nha=i.detail
        this.image1 = this.nha.thumnail;
          this.image2 = this.nha.anh[0];
          this.image3 =this.nha.anh[1];
          this.image4 = this.nha.anh[2];
          this.image5 = this.nha.anh[3];
          this.image6 = this.nha.anh[4];

      }
    else{
      this._service.getSP().subscribe({
        next: (data) => {this.SP = data
          if (this.SP && this.SP.length > 1) {
            for(let i of this.SP){
              if(i.ma==this.id){ 
                this.nha=i
            this.image1 = i.thumnail;
            this.image2 = i.anh[0];
            this.image3 =i.anh[1];
            this.image4 = i.anh[2];
            this.image5 = i.anh[3];
            this.image6 = i.anh[4];
            
            this.initMap()
            
          }}
          } 
        
        var formattedText = this.nha.mota.replace(/\n/g, ". ");
        this.mota=formattedText
        this.updateDisplayText();
        },
        
        error: (err) => (this.errMsg= err.message)
      });
    }
    }
        
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    
  
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
  openPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.updateDisplayText();
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
cancel(){
  
 

this.nhadathue = { ...this.rental1.detail }; // Sao chép tất cả các thuộc tính
delete this.nhadathue._id; // Xóa thuộc tính _id
delete this.nhadathue.createdAt; // Xóa thuộc tính _id
delete this.nhadathue.updatedAt; // Xóa thuộc tính _id

  this._service.deleteRented(this.rental1.manha,this.rental1.cus ).subscribe({
    
    next: (response) =>{
      alert('Product delete successfully');
  
    },
    error: (err) => (this.errMsg= err.message)
  })
}
  
    
  

}



