import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.toggle$.subscribe(() => {
      this.toggleSidebar();
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  get isMobile() {
    return window.innerWidth < 768;
  }
}
