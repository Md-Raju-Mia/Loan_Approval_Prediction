import {ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { LoanelementComponent } from "../loanelement/loanelement.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-loanform',
  imports: [FormsModule, CommonModule, LoanelementComponent, SidebarComponent],
  templateUrl: './loanform.component.html',
  styleUrl: './loanform.component.css'
})
export class LoanformComponent {

  isSidebarOpen1: boolean=true;
  toggleSidebar(): void {
    this.isSidebarOpen1 = !this.isSidebarOpen1;
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    
    if (sidebar) {
      sidebar.classList.toggle("closed");
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("open");
      }
    }
    if (main) {
      main.style.marginLeft = this.isSidebarOpen1 ? '250px' : '70px';
    }
  }

}