import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './Employee/employees/employees.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';


const routes: Routes = [
  {path:'',component:EmployeesComponent},
  {path:'EmployeesComponent',component:EmployeesComponent},
  {path:'AddEmployeeComponent',component:AddEmployeeComponent},
  {path:'UpdateEmployeeComponent',component:UpdateEmployeeComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
