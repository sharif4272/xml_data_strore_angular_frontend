import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  message: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Data Loading Problem:', err);
        this.message = 'Data Loading Problem is occured';
      }
    });
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this Employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.message = 'Employee deleted successfully!';
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Failed to delete:', err);
          this.message = 'It seams to not be able to delete this Employee!';
        }
      });
    }
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/detail', id]);
  }

  addNewEmployee(): void {
    this.router.navigate(['/add']);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.employeeService.uploadXmlFile(file).subscribe({
        next: () => {
          this.message = 'XML File Uploaded Successfully!';
          this.loadEmployees();
        },
        error: (err) => {
          this.message = 'Fail to Upload: ' + (err.error?.message || 'Undefine Error');
        }
      });
    }
  }
}
