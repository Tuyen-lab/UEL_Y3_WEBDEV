import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/sp.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent implements OnInit {

  image1='';
  image2='';
  image3='';
  image4='';
  image5='';
  image6='';
  SP: any
  isPopupOpen = false;
  selectedImage: string | null = null;
  errMsg: string | null = null;
  selectedId: any
  constructor(private _service: ExampleService,private activate: ActivatedRoute) {}
  id: any
  ngOnInit(): void {
    this._service.getSP().subscribe({
      next: (data) => {this.SP = data
        if (this.SP && this.SP.length > 1) { 
          this.image1 = this.SP[this.id-1].thumnail;
          this.image2 = this.SP[this.id-1].anh[0];
          this.image3 = this.SP[this.id-1].anh[1];
          this.image4 = this.SP[this.id-1].anh[2];
          this.image5 = this.SP[this.id-1].anh[3];
          this.image6 = this.SP[this.id-1].thumbnail;
        } 
      },
      error: (err) => (this.errMsg= err.message)
    });
  
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
}