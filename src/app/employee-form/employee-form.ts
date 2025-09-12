import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./employee-form.css']
})
export class EmployeeFormComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      division: ['', Validators.required],
      building: ['', Validators.required],
      title: ['', Validators.required],
      room: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      this.employeeService.createEmployee(employee).subscribe({
        next: () => {
          alert('Submitted successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('An error has occurred!');
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
