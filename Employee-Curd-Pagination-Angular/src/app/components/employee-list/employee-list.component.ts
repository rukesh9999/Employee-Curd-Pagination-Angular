import { Component, TemplateRef ,OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Designation } from 'src/app/models/Designation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeForm:any=FormGroup; 
  locations:Location[]=[];
  designations:Designation[]=[];
  employees:Employee[]=[];
  currentEmployee?: Employee;
  currentIndex = -1;
  title = '';
  totalPages:number;
  pageNumber = 1;
  count = 0;
  itemsPerPage = 3;
  pageSizes = [3, 5, 10];
  modalRef?: BsModalRef;
  message?: string;
  flag:boolean=false;

  firstName:String;
  lastName:String;
  Code:String;
  Email:String;
  locationId:number;
  designationId:number;
  toDate:Date;
  fromDate:Date;


  

  constructor(private _employeeservice:EmployeeService,
    private modalService: BsModalService,
    private _toaster:ToastrService,
    private fb:FormBuilder
    ) { 
    
      this.employeeForm=this.fb.group({
        firstName:new FormControl(''),
        lastName:new FormControl('',),
        email:new FormControl(''),
        designationId:new FormControl('',),
        locationId:new FormControl(''),
        code:new FormControl(''),
        fromDate:new FormControl(''),
        toDate:new FormControl(''),
        pageNumber:new FormControl(''),
        itemsPerPage:new FormControl('')
      });
      this.employeeForm.controls['pageNumber'].setValue(this.pageNumber-1);
      this.employeeForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
  

    }

  ngOnInit(): void {
   
    this.getEmployees(this.employeeForm);
    this.getAllLocations();
    this.getAllDesignations();
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirmToInactive(id:number): void {
    this.flag=false;
    this.message = 'Confirmed!';
    this.modalRef?.hide();
    console.log(id)
    this._employeeservice.inactiveEmployee(id)
    .subscribe(
      (response)=>{
       console.log(response)
       
      },
      (error)=>{
        console.log(error)

      });

      this.getEmployees(this.employeeForm);
      window.location.reload();
      this._toaster.success('Employee Inactived');
     
  }
 
  


  declineToInactive(): void {
    this.flag=false;
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
 
  getAllLocations()
  {
     this._employeeservice.getAllLocations()
        .subscribe(
          data=>{
            this.locations=data;
          },
          error=>{
            console.log(error)
          }
        );
  }


  getAllDesignations()
  {
    this._employeeservice.getAllDesignations()
     .subscribe(
       data=>{
        this.designations=data;
       },
       error=>{
         console.log(error);
       }
     );
  }

  
  
  handlePageSizeChange(event: any): void {
    this.itemsPerPage=event.target.value;
    this.employeeForm.controls['itemsPerPage'].setValue(event.target.value);
    this.pageNumber = 1;
    this.employeeForm.controls['pageNumber'].setValue(this.pageNumber-1);
    this.getEmployees(this.employeeForm);
  }
  handlePageChange(event) {
    console.log('event....'+event);
    this.pageNumber = event;
    this.employeeForm.controls['pageNumber'].setValue(event-1);
    console.log('page change....'+this.employeeForm.value);
    
    this.getEmployees(this.employeeForm);
  }

  Reset(employeeForm:FormGroup){
  
    employeeForm.reset();
    this.employeeForm.controls['pageNumber'].setValue(this.pageNumber-1);
    this.employeeForm.controls['itemsPerPage'].setValue(this.itemsPerPage);
  
  }

  

  getEmployees(employeeForm:FormGroup)
  {
   
    const employee=employeeForm.value;
    console.log('employeeForm......'+JSON.stringify(employee));
    
    this._employeeservice.getEmployees(employee).subscribe(
      response=>{
        console.log('response....'+response);
        
        const{Employees,totalElements}=response;
        this.employees=Employees;
        this.count=totalElements;
        this.totalPages=this.totalPages;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }


  getEmployeesThroughForm(employeeForm:FormGroup)
  {
   
    const employee=employeeForm.value;
    employee['pageNumber'] = 0;
    employee['itemsPerPage'] = this.employeeForm.controls['itemsPerPage'].value ;
    this.pageNumber=1
    console.log('employeeForm......'+JSON.stringify(employee));
    
    this._employeeservice.getEmployees(employee).subscribe(
      response=>{
        console.log('response....'+response);
        
        const{Employees,totalElements}=response;
        this.employees=Employees;
        this.count=totalElements;
        this.totalPages=this.totalPages;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
