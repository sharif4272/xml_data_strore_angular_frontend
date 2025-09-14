import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee.model';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
  styleUrls: ['./employee-list.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  message: string = '';

  // Pagination properties
  pageSize: number = 5; // Items per page
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.updatePagination(); // Recalculate pagination after data loads
      },
      error: (err) => {
        console.error('Data Loading Problem:', err);
        this.message = 'Data Loading Problem occurred';
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.employees.length / this.pageSize);
    // Ensure current page is within bounds
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, and middle pages around current
      let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let end = Math.min(this.totalPages, start + maxVisiblePages - 1);

      // Adjust start if near end
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (start > 1) {
        pages.splice(1, 0, -1); // -1 represents ellipsis
      }
      if (end < this.totalPages) {
        pages.push(-1); // ellipsis at end
      }
    }

    return pages;
  }


  get paginatedEmployees(): Employee[] {
    if (!this.employees || this.employees.length === 0) return [];
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.employees.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
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
          this.message = 'It seems it cannot delete this Employee!';
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
          this.message = 'Fail to Upload: ' + (err.error?.message || 'Undefined Error');
        }
      });
    }
  }

  protected readonly Math = Math;
}


// import { Component, OnInit } from '@angular/core';
// import { Employee } from '../models/employee.model';
// import { EmployeeService } from '../services/employee.service';
// import { Router } from '@angular/router';
//
// @Component({
//   selector: 'app-employee-list',
//   templateUrl: './employee-list.html',
//   styleUrls: ['./employee-list.css']
// })
// export class EmployeeListComponent implements OnInit {
//   employees: Employee[] = [];
//   message: string = '';
//
//   constructor(
//     private employeeService: EmployeeService,
//     private router: Router
//   ) { }
//
//   ngOnInit(): void {
//     this.loadEmployees();
//   }
//
//   loadEmployees(): void {
//     this.employeeService.getAllEmployees().subscribe({
//       next: (data) => {
//         this.employees = data;
//       },
//       error: (err) => {
//         console.error('Data Loading Problem:', err);
//         this.message = 'Data Loading Problem is occured';
//       }
//     });
//   }
//
//   deleteEmployee(id: number): void {
//     if (confirm('Are you sure you want to delete this Employee?')) {
//       this.employeeService.deleteEmployee(id).subscribe({
//         next: () => {
//           this.message = 'Employee deleted successfully!';
//           this.loadEmployees();
//         },
//         error: (err) => {
//           console.error('Failed to delete:', err);
//           this.message = 'It seams to not be able to delete this Employee!';
//         }
//       });
//     }
//   }
//
//   editEmployee(id: number): void {
//     this.router.navigate(['/edit', id]);
//   }
//
//   viewEmployee(id: number): void {
//     this.router.navigate(['/detail', id]);
//   }
//
//   addNewEmployee(): void {
//     this.router.navigate(['/add']);
//   }
//
//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.employeeService.uploadXmlFile(file).subscribe({
//         next: () => {
//           this.message = 'XML File Uploaded Successfully!';
//           this.loadEmployees();
//         },
//         error: (err) => {
//           this.message = 'Fail to Upload: ' + (err.error?.message || 'Undefine Error');
//         }
//       });
//     }
//   }
// }
