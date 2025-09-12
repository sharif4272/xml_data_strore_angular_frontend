import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

const apiUrl = 'http://localhost:9092/api/v1/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Read
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${apiUrl}/find/all`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${apiUrl}/find/${id}`);
  }

  // Create
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${apiUrl}/create`, employee);
  }

  // Update
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${apiUrl}/update/${id}`, employee);
  }

  // Delete
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/delete/${id}`);
  }

  // XML Upload
  uploadXmlFile(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${apiUrl}/upload/xml`, formData);
  }
}
