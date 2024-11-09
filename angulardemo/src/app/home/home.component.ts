import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router , RouterOutlet } from '@angular/router';
import { ExampleService } from '../service/sp.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  SP : any
  errMsg=''
  selectedId: any
  constructor(private _service: ExampleService, private router: Router, private active: ActivatedRoute){}
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data},
      error: (err) => (this.errMsg= err.message)
      
    })
    this.active.paramMap.subscribe((param) => {
      let id = param.get('id')
      if (id != null) this.selectedId = parseInt(id);
    })
}
onActive(p:any){
  return p.id == this.selectedId;
}
OnitemClick(p: any){
  this.router.navigate (['/home',p.ma])
}
}
