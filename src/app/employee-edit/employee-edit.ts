import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./employee-edit.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
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

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadEmployee();
    }
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.id!).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
      },
      error: (err) => {
        alert('An Error Occured');
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid && this.id) {
      const updatedEmployee: Employee = this.employeeForm.value;
      this.employeeService.updateEmployee(this.id, updatedEmployee).subscribe({
        next: () => {
          alert('Updated Employee Successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('An Error Occured');
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
