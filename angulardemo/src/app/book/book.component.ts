import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Route } from '@angular/router';
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
  constructor(private _service: ExampleService,  private active: ActivatedRoute){}
  ngOnInit(): void {
    this._service.getrental().subscribe({
      next: (data) => {this.SP = data;
        this.id = this.active.snapshot.paramMap.get('id')!;
        for (let i of this.SP){
         
          if (this.id== i.manha){
         
          this.ngaynhan= i.ngaythue
          this.ngaytra= i.ngaytra
          this.gia=i.gia
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
    })
    
    
    
    
    
    

  }
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
}
