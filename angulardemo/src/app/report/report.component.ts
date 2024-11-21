import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  SP : any
  errMsg=''
  isActive=true
  wish={cus:'loc',manha:'2'}
  selectedId: any
  wishlist: any
  constructor(private _service: ExampleService, private router: Router, private active: ActivatedRoute){}
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data},
      error: (err) => (this.errMsg= err.message)
      
    })}
    OnitemClick(p: any){
      this.router.navigate (['/home',p.ma])
    }
}
