import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EmployeeService } from './services/employee.service';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxAlertMessageModule } from 'ngx-alert-message';
import { TestComponent } from './components/test/test.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    PageNotFoundComponent,
    EditEmployeeComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    
    
      ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
	  BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAlertMessageModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    {provide: ToastrService, useClass: ToastrService}
    ,EmployeeService,BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
