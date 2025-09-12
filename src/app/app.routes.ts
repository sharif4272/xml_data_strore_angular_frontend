import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeEditComponent } from './employee-edit/employee-edit';
import { EmployeeDetailComponent } from './employee-detail/employee-detail';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent }
];
