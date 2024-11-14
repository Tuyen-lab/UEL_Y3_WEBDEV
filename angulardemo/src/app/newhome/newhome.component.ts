import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  errMsg=''
  selectedId: any
  giamgia=0
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data.slice(0, 4)},
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

}
