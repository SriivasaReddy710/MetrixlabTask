import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../Services/service.service'
import {ActivatedRoute,Router} from '@angular/router'
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
employeelist:any=[];

  totalrecods:any;
  pagenumber:number=1;
  constructor(private generalservices:ServiceService, private activaterouter:ActivatedRoute,private router:Router
    ) {

   }

  ngOnInit(): void {
this.generalservices.Getdata().subscribe((res:any)=>{
  debugger
  this.employeelist=res.data;

  this.totalrecods=res.data.length;
  console.log(this.employeelist)
},error=>{
  console.log('emplisterror'+error)
})
  }
  Empupdate(item){
  debugger
  this.generalservices.setupdate(item)
this.router.navigate(['/UpdateEmployeeComponent'])
  }
}
