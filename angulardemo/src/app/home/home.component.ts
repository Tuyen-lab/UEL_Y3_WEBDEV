import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
 
  constructor(private _service: ExampleService){}
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data},
      error: (err) => (this.errMsg= err.message)
      
    })
}}
