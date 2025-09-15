import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  constructor(private sidebarService: SidebarService) {} // ✅ Correct — inject service

  toggleSidebar() {
    this.sidebarService.toggle(); // ✅ Tell service to toggle
  }
}
