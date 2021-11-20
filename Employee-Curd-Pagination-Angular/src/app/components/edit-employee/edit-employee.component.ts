import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Designation } from 'src/app/models/Designation';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  locations:Location[]=[];
  designations:Designation[]=[];
  public empFile:any=File;
  employeeForm:any=FormGroup;
  employee:Employee = new Employee();
  constructor(private _empservice:EmployeeService,
    private fb:FormBuilder,
    private toastr: ToastrService,
    private _activatedroute:ActivatedRoute,
    private _route:Router) {
    this.employeeForm=this.fb.group({
      id:new FormControl('',[Validators.required]),
      firstName:new FormControl('{{employee.firstName}}',[Validators.required,Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.minLength(3)])]),
      lastName:new FormControl('',[Validators.required,Validators.compose([Validators.pattern('[a-zA-Z]*'),Validators.minLength(3)])]),
      email:new FormControl('',[Validators.required,Validators.compose([Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'),Validators.minLength(3)])]),
      designationId:new FormControl('',[Validators.required]),
      locationId:new FormControl('',[Validators.required])
    });
   }

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllDesignations();
    const id:number = parseInt(this._activatedroute.snapshot.paramMap.get('id'));
    this._activatedroute.paramMap.subscribe(()=>{
     this.getEmployee(id);
    });
  }

  getEmployee(id:number)
  {
    this._empservice.getEmployee(id).subscribe(
      response=>{
       
        this.employeeForm.controls['id'].setValue(response.id);
        this.employeeForm.controls['firstName'].setValue(response.firstName);
        this.employeeForm.controls['lastName'].setValue(response.lastName);
        this.employeeForm.controls['email'].setValue(response.email);
        this.employeeForm.controls['designationId'].setValue(response.designationId);
        this.employeeForm.controls['locationId'].setValue(response.locationId);

        console.log(response)
      },
      error=>{
        console.log(error)
      }
    );
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

   updateEmployee(employeeForm:FormControl)
  {  
        console.log('update....'+JSON.stringify(employeeForm.value));
        
        const formData =new FormData();
       
        formData.append('employee',JSON.stringify(employeeForm.value));
        formData.append('file',this.empFile);
        this._empservice.updateEmployee(formData).subscribe(
          response=>{
            console.log(response)
            
            if(response.status==200)
            {
               this.toastr.success("Employee updated successfully!!","Status");
            }else{
              this.toastr.error("Failed to update Employee","Status");
            }
          },
          error=>{
           
            if(error.status==200)
            {
              this.toastr.success("Employee updated successfully!!","Status");
            }else{
              this.toastr.error("Failed to update Employee","Status");
            }
          }
        );
        this.employeeForm.reset();
        this._route.navigateByUrl('list');
       
     
  }
    
  


  uploadFile(event)
  {
      const file = event.target.files[0];
      this.empFile=file;
      
  }

}
