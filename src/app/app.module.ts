import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Customers
import { CustomerIndexComponent } from './components/customer/customer-index/customer-index.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerShowComponent } from './components/customer/customer-show/customer-show.component';
import { CustomerSearchComponent } from './components/customer/customer-search/customer-search.component';

// Suppliers
import { SupplierIndexComponent } from './components/supplier/supplier-index/supplier-index.component';
import { SupplierCreateComponent } from './components/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './components/supplier/supplier-edit/supplier-edit.component';
import { SupplierShowComponent } from './components/supplier/supplier-show/supplier-show.component';
import { SupplierSearchComponent } from './components/supplier/supplier-search/supplier-search.component';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        DashboardComponent,
        // Customers
        CustomerIndexComponent,
        CustomerCreateComponent,
        CustomerEditComponent,
        CustomerShowComponent,
        CustomerSearchComponent,
        // Suppliers
        SupplierIndexComponent,
        SupplierCreateComponent,
        SupplierEditComponent,
        SupplierShowComponent,
        SupplierSearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
