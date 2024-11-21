import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExampleService } from '../service/sp.service';
import { flatMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  name=localStorage.getItem('user')
  SP: any
  dacomment=''
  rented: any[]=[]
  errMsg=''
  currentView: string = 'myRooms';
  isActive=false
  wish={cus:'loc',manha:'2'}
  constructor (private router: Router, private _service:ExampleService){}
  house: any
  wishlist: any
  wished: any[]=[]
  wishhouse: any[]=[]
  u:any
  user={ username:'',pass:'', phone:'',email:'' }
name1=true
popcheck=''
  pass=true
  phone1=true
  email1=true
  nameagain=true
  history: any
  historydetail: any[]=[]
  userwarehouse:any
  stayinged: any
  staying: any[]=[]
  allComment: any
  cusComment: any[]=[]
  waitComment: any[]=[]
  waitCommentdetail: any[]=[]
  ngOnInit(): void {
    
    this._service.getuser().subscribe({
      next: (data) => {this.u = data
          for(let i of this.u){
            if(i.username==this.name){
              this.user.username=i.username
              this.user.pass=i.pass
              this.user.phone=i.phone
              this.user.email=i.email
        console.log(this.user)
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
    this._service.getHistory().subscribe({
      next: (data) => {this.history = data
        console.log(this.history)
        this.waitComment=this.history
        for( let i of this.history){
          if (i.host==this.name){
            this.historydetail.push(i.detail)
          }
        }
        this._service.getComment().subscribe({
          next: (data) => {this.allComment = data
            for( let h of this.waitComment){
              for(let i of this.allComment){
                if(i.cus==h.cus && i.manha==h.manha){this.waitComment=this.waitComment.filter(item => !(item.manha === i.manha && item.cus === i.cus))}
                
                }
              }
              for(let i of this.waitComment){
                this.waitCommentdetail.push(i.detail)
              }
      
            }
            
            
          })
         
        
        
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    
    this._service.getrWish().subscribe({
      next: (data) => {this.wishlist = data;
        for(let i of this.wishlist){
          if (i.cus==localStorage.getItem('user')){
              this.wished.push(i)
          }
        }
        console.log(this.wishlist)
        console.log(this.wished)
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getSP().subscribe({
      next: (data) => {
        this.house = data
        for(let i of this.wished){
    
          for(let p of this.house){
            if(i.manha==p.ma){
              this.wishhouse.push(p)
            }
          }
        }
       
      },
      error: (err) => (this.errMsg= err.message)
      
    })
    this._service.getrental().subscribe({
      next: (data) => {this.SP = data;
        for(let i of this.SP){
          if (i.cus==this.name){
            this.rented.push(i.detail)
          }
        }
      },
      error: (err) => (this.errMsg= err.message)
      
    })}
  toPost(){
    this.router.navigate(['/post'])
  }

 
OnitemClick(p: any){
  for(let i of this.SP){
    if( i.ma==p.manha){
      localStorage.removeItem('chixem');
      localStorage.setItem('ngaynhan',i.ngaythue)
      localStorage.setItem('ngaytra',i.ngaytra)
    }
  }
  
  this.router.navigate (['/home',p.ma])
}
isPopupVisible: boolean = false; // Trạng thái hiển thị popup

openPopup(p: any) {
  this.popcheck=p.ma

}

closePopup(event?: MouseEvent) {
  // Đóng popup khi nhấn ngoài nội dung
  if (!event || (event.target as HTMLElement).classList.contains('popup')) {
    this.popcheck = 'false';
  }
}
OnitemClick4(p: any){
  let nhathue : any
  for(let i of this.SP){

    if(i.manha==p.ma && i.cus==localStorage.getItem('user')){
     console.log(i)
      nhathue=i
    }
  }
  this._service.deleteRented(nhathue.manha,nhathue.cus).subscribe({

    next: (response) =>{

    },
    error: (err) => (this.errMsg= err.message)
  })
  window.location.reload();
}
submitRating(p: any,sao:HTMLInputElement ,comment: HTMLTextAreaElement ) {
  let nhathue={manha: p.ma, host: p.chuho, cus:this.name , sao: parseInt(sao.value), comment: comment.value}
  this._service.addComment(nhathue).subscribe({
  
    next: (response) =>{
      alert('Product added successfully');
    },
    error: (err) => (this.errMsg= err.message)
  })
  console.log('Đánh giá đã được gửi!');
  this.popcheck = ''; // Đóng popup sau khi gửi
  this.dacomment=nhathue.manha
}
toggleActive() {
  this.isActive = !this.isActive; // Đảo ngược trạng thái khi nhấn
  if(this.isActive)
    {
      this._service.addwish(this.wish).subscribe({
  
        next: (response) =>{
          alert('Product added successfully');
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
    else{
      this._service.deleteWish(this.wish.cus,this.wish.manha).subscribe({
    
        next: (response) =>{
          alert('Product delete successfully');
      
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
}
OnitemClick1(p: any){
  this.router.navigate (['/home',p.ma])
}
submit(username:HTMLInputElement,pass:HTMLInputElement, phone:HTMLInputElement,email:HTMLInputElement){
  this.user.username=username.value
  this.user.pass=pass.value
  this.user.phone=phone.value
  this.user.email=email.value
  
  if(phone.value==''){
    this.phone1=false

  }
  else{this.phone1=true}

  if(email.value==''){
    this.email1=false
  }
  else{this.email1=true}

  if(username.value==''){
    this.name1=false
  }
  else{this.name1=true}

  if(pass.value==''){
    this.pass=false
  }
  else{this.pass=true}

 
  if(username.value!='' && pass.value!='' && phone.value!=''&& email.value!=''){
    for(let u of this.u){
      if(u.username==username.value && (u.username!=localStorage.getItem('user'))){
        this.nameagain=false
        break
      }
      else{
        this.nameagain=true
        
        }
      }
    
    }
    if(this.nameagain==true && pass.value!='' && phone.value!=''&& email.value!=''){
      console.log(this.user)
      this._service.updateUser(this.user.username,this.user).subscribe({
        
        next: (response) =>{
          alert('Cập nhật thành công');
        },
        error: (err) => (this.errMsg= err.message)
      })
    }
  

}
emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
