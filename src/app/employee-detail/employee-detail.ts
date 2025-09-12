import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.id!).subscribe({
      next: (emp) => {
        this.employee = emp;
      },
      error: (err) => {
        console.error('An error occurred:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
