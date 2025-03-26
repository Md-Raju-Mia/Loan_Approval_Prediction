import { AfterViewInit, Component, EventEmitter, Output, output } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { Router, RouterLink } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements AfterViewInit {

  @Output() toggleEvent = new EventEmitter();

  toggleNav(): void{
    this.toggleEvent.emit();
  }

  constructor(
    private sessionService:SessionService,
    private router:Router,
  ) {}

logout(): void{
  this.sessionService.clearUserEmail();
  this.router.navigate(['/login']);
}


// toggleNav(): void {
//   const sidebar = document.getElementById("mySidebar");
//   const main = document.getElementById("main");
  
//   if (sidebar) {
//     sidebar.classList.toggle("closed");
//     if (window.innerWidth <= 768) {
//       sidebar.classList.toggle("open");
//     }
//   }
// }

 ngAfterViewInit(): void {
    Chart.register(...registerables);

    new Chart('loanChart',{
      type:'doughnut',
      data:{
        labels:['Approved', 'Pending', 'Rejected'],
        datasets:[
          {
            data:[780, 470, 200],
            backgroundColor:['#28a745','#ffc107', '#dc3545']
          },
        ],
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
      },
    });
  }


}
