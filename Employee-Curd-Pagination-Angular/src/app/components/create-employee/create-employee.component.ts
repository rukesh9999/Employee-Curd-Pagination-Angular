import { animation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Designation } from 'src/app/models/Designation';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {

  locations:Location[]=[];
  designations:Designation[]=[];
  public empFile:any=File;
  employeeForm:any=FormGroup;
  

  constructor(private _empservice:EmployeeService
    ,private fb:FormBuilder,
    private toastr: ToastrService,
    private _route:Router) 
  { 
     this.employeeForm=this.fb.group({
       firstName:new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.minLength(3)])]),
       lastName:new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[a-zA-Z]*')])]),
       email:new FormControl('',[Validators.required,Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'),Validators.minLength(3)])]),
       designationId:new FormControl('',[Validators.required]),
       locationId:new FormControl('',[Validators.required])
     });
  }

  
  ngOnInit(): void {
    this.getAllLocations();
    this.getAllDesignations();
  }

  getAllLocations()
  {
     this._empservice.getAllLocations()
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
    this._empservice.getAllDesignations()
     .subscribe(
       data=>{
        this.designations=data;
       },
       error=>{
         console.log(error);
       }
     );
  }

  saveEmployee(submitForm:FormGroup)
  {
     if(submitForm.valid)
     {
        console.log(submitForm.value);
        const employee =submitForm.value;
        const formData =new FormData();
        formData.append('employee',JSON.stringify(employee));
        formData.append('file',this.empFile);
        this._empservice.saveEmployee(formData).subscribe(
          response=>{
            console.log(response)
            
            if(response.status==200)
            {
               this.toastr.success("Employee saved successfully!!","Status");
            }else{
              this.toastr.error("Failed to save Employee","Status");
            }
          },
          error=>{
           
            if(error.status==200)
            {
              this.toastr.success("Employee saved successfully!!","Status");
            }else{
              this.toastr.error("Failed to save Employee","Status");
            }
          }
        );
        this.employeeForm.reset();
        this._route.navigateByUrl('list');
     }else{
         this.validateFormFields(submitForm)

     }
  }
    
  
  validateFormFields(submitForm:FormGroup)
  {
    Object.keys(submitForm.controls).forEach(field=>{
      const control = submitForm.get(field)
      if(control  instanceof FormControl)
      {
         control.markAsTouched({
           onlySelf:true
         })
      }else if(control instanceof FormGroup){
         this.validateFormFields(control);
      }
    })
  }

  uploadFile(event)
  {
      const file = event.target.files[0];
      this.empFile=file;
      
  }

 


}


