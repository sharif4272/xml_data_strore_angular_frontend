import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';
import { FooterComponent } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

}
