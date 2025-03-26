import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-loanelement',
  imports: [HeaderComponent,FormsModule,NgIf,CommonModule],
  templateUrl: './loanelement.component.html',
  styleUrl: './loanelement.component.css'
})
export class LoanelementComponent {

  @Input() isSidebarOpen1: boolean = true;

  @ViewChild('incomeChart') incomeChartRef! : ElementRef;
  @ViewChild('emiChart') emiChartRef! : ElementRef;

  formData: any = {};
  predictionResult: any = null;
  incomeChart: any;
  emiChart: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,
    private sessionService:SessionService, 
    private router:Router
  ) {
    Chart.register(...registerables);
  }

  onSubmit(loanForm: NgForm) {
    const apiUrl = 'http://127.0.0.1:5000/predict';
    this.http.post(apiUrl, this.formData).subscribe(
      (response: any) => {
        this.predictionResult = response;
        this.cdr.detectChanges(); // Force DOM update
        this.createCharts();

        // Reset the form after submission
      this.formData = {}; // Reset form data
      loanForm.reset(); // Reset the form reference
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createCharts() {
    // Destroy existing charts if they exist
    if (this.incomeChart) {
      this.incomeChart.destroy();
    }
    if (this.emiChart) {
      this.emiChart.destroy();
    }

    // Income Breakdown Chart
    if (this.incomeChartRef?.nativeElement) {
      this.incomeChart = new Chart(this.incomeChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Applicant Income', 'Coapplicant Income'],
          datasets: [{
            label: 'Income',
            data: [this.formData.ApplicantIncome, this.formData.CoapplicantIncome],
            backgroundColor: ['#36A2EB', '#FF6384']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    // EMI Overview Chart
    if (this.emiChartRef?.nativeElement) {
      const emi = this.formData.LoanAmount / (this.formData.Loan_Amount_Term + 1);
      this.emiChart = new Chart(this.emiChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: ['EMI'],
          datasets: [{
            label: 'EMI',
            data: [emi],
            backgroundColor: ['#4BC0C0']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }


}
