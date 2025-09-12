import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeEditComponent } from './employee-edit/employee-edit';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeEditComponent }
];
