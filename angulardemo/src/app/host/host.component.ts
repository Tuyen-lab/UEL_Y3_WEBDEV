import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  name=localStorage.getItem('user')
  SPrent: any
  rented: any[]=[]
  stayinged: any
  staying: any[]=[]
  SP: any
  added: any[]=[]
  errMsg=''
  currentView: string = 'myRooms';
  constructor (private router: Router,private _service:ExampleService){}
  ngOnInit(): void {
    this._service.getrental().subscribe({
      next: (data) => {this.SPrent = data;
        for(let i of this.SPrent){
          if (i.host==this.name){
            this.rented.push(i.detail)
          }
        }
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getStaying().subscribe({
      next: (data) => {this.stayinged = data
        console.log(this.stayinged)
        for( let i of this.stayinged){
          if (i.host==this.name){
            this.staying.push(i.detail)
          }
        }
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data;
        for(let i of this.SP){
          if (i.chuho==this.name){
            this.added.push(i)
          }
        }
      },
      error: (err) => (this.errMsg= err.message)
      
    })
  }
    
  toPost(){
    this.router.navigate(['/post'])
  }
  OnitemClick(p: any){
    for(let i of this.SPrent){
      if( i.ma==p.manha){
        localStorage.removeItem('chixem');
        localStorage.setItem('ngaynhan',i.ngaythue)
        localStorage.setItem('ngaytra',i.ngaytra)
      }
    }
    this.router.navigate (['/manage',p.ma])
  }
  OnitemClick2(p: any){
    localStorage.setItem('chixem','chixem')
    this.router.navigate (['/manage',p.ma])
  }
  OnitemClick3(p: any){
    let nhathue : any
    for(let i of this.SPrent){
      console.log(i.manha)
      console.log(p.ma)
      if(i.manha==p.ma && i.host==localStorage.getItem('user')){
       console.log(i)
        nhathue=i
      }
    }
    console.log(nhathue)
    this._service.addStaying(nhathue).subscribe({
  
      next: (response) =>{
        alert('Product added successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    console.log(p)
    this._service.deleteRented(nhathue.manha,nhathue.cus).subscribe({
  
      next: (response) =>{
        alert('Product delete successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    window.location.reload();
    this.currentView='onStaying'
  }
  OnitemClick5(p: any){
    let nhathue : any
    for(let i of this.stayinged){
      console.log(i.manha)
      console.log(p.ma)
      if(i.manha==p.ma && i.host==localStorage.getItem('user')){
       console.log(i)
        nhathue=i
      }
    }
    console.log(nhathue)
    this._service.addHistory(nhathue).subscribe({
  
      next: (response) =>{
        alert('Product added successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    console.log(p)
    this._service.deleteStaying(nhathue.manha,nhathue.cus).subscribe({
  
      next: (response) =>{
        alert('Product delete successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    window.location.reload();
    this.currentView='onStaying'
  }
  OnitemClick4(p: any){
    let cus= localStorage.getItem('user')||''
    this._service.deleteRented(p.manha,cus).subscribe({
  
      next: (response) =>{
        alert('Product delete successfully');
      },
      error: (err) => (this.errMsg= err.message)
    })
    window.location.reload();
  }
}
