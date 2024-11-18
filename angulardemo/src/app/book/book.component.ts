import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  SP : any 
  errMsg=''
  selectedId: any
  ngaynhan=''
  ngaytra=''
  gia=''
  chunha=''
  ngayo=0
  id: any
  tien=0
  dv=580206
  tong=0
  anh=''
  title=''
  name=''
  rental1={manha: '',
    gia:'',
    host: '',
    cus:'',
    ngaythue: '',
    ngaytra: '',
    detail: {}}
    nhathue: any
  constructor(private _service: ExampleService,  private active: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data;
        this.id = this.active.snapshot.paramMap.get('id')!;
        for (let i of this.SP){
         
          if (this.id== i.ma){
            this.nhathue=i
          this.ngaynhan= localStorage.getItem('ngaynhan')||''
          this.ngaytra= localStorage.getItem('ngaytra')||''
          this.gia=i.gia
          this.title=i.title
          this.name=i.ten
          this.anh=i.thumnail
          this.chunha= i.host}}
          this.ngayo=this.calculateDaysDifference(this.ngaynhan,this.ngaytra)
          this.tien=this.ngayo* parseInt(this.gia)*1000000
          this.tong=this.tien+this.dv
        },
      error: (err) => (this.errMsg= err.message)
      
    })
    
    this.active.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id != null) this.selectedId = parseInt(id);
    })}
  
  calculateDaysDifference(date1: string, date2: string): number {
    // Chuyển đổi các chuỗi ngày thành đối tượng Date
    const d1 = new Date(date1);
    const d2 = new Date(date2);
  
    // Tính chênh lệch thời gian (theo mili giây)
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  
    // Chuyển đổi mili giây thành ngày
    const dayDiff = timeDiff / (1000 * 3600 * 24);
  
    return dayDiff;
  }
  submitData() {
      
    
    this.rental1.manha=this.nhathue.ma
    this.rental1.gia=this.nhathue.gia
    this.rental1.host=this.nhathue.chuho
    this.rental1.cus=localStorage.getItem('user')||''
    this.rental1.ngaythue=this.ngaynhan
    this.rental1.ngaytra=this.ngaytra
    this.rental1.detail=this.nhathue
   
    
  this._service.addrental(this.rental1).subscribe({
  
      next: (response) =>{
        alert('Product added successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    
  
  
    alert('Đặt phòng thành công')
    localStorage.removeItem('ngaynhan')
    localStorage.removeItem('ngaytra')
    this.router.navigate([`/home`])
  }

  
}

