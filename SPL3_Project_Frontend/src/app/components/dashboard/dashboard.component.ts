import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainComponent } from "../main/main.component";

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  isSidebarOpen: boolean=true;
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    
    if (sidebar) {
      sidebar.classList.toggle("closed");
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("open");
      }
    }
    if (main) {
      main.style.marginLeft = this.isSidebarOpen ? '250px' : '70px';
    }
  }

 
}




