import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  key='';
  SP : any
  errMsg=''
  id=''
  searchResult: any[]=[]
  notification: string = '';
  constructor(private _service: ExampleService, private router: Router, private active: ActivatedRoute){}
  map: L.Map | undefined;
  ngOnInit(): void {
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
          else if(typeof p[i]==='object'){
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
        if(this.searchResult.length==0){
          this.notification = 'Chưa có chỗ ở nào được cập nhật';
        }
        else{this.initMap(); this.notification = '';}
        
        
        
        
      },
      error: (err) => (this.errMsg= err.message)
      
    })
   
    
   
   
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
}
