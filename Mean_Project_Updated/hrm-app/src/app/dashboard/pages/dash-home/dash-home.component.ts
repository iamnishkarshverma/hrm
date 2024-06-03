import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CheckInCheckOutService } from '../../../services/checkin-checkout.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { stat } from 'node:fs';

@Component({
  selector: 'app-dash-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  employee: any;
  id: string | undefined;
  status: any;

  constructor(
    private employeeService: EmployeeService, 
    private checkInCheckOutService: CheckInCheckOutService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('employee_id') ?? '';
    if (!this.id) {
      this.router.navigate(['login']);
    } else {
      this.employeeService.getEmployeeById(this.id).subscribe((data) => {
        this.employee = data;
      });
      this.checkInCheckOutService.getStatus(this.id).subscribe((status) => {
        this.status = status;
        console.log(status)
      });
    }
  }

  onCheckIn(): void {
    if (this.id) {
      this.checkInCheckOutService.checkIn(this.id).subscribe((data) => {
        this.status = data;
      });
    }
  }

  onCheckOut(): void {
    if (this.id) {
      this.checkInCheckOutService.checkOut(this.id).subscribe((data) => {
        this.status = data;
      });
    }
  }
}
