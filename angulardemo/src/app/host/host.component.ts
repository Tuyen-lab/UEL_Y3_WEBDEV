import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  currentView: string = 'myRooms';
  constructor (private router: Router){}

  toPost(){
    this.router.navigate(['/post'])
  }

}
