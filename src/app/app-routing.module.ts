import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TemplateComponent } from './components/template/template.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerIndexComponent } from './components/customer/customer-index/customer-index.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerShowComponent } from './components/customer/customer-show/customer-show.component';
import { SupplierIndexComponent } from './components/supplier/supplier-index/supplier-index.component';
import { SupplierCreateComponent } from './components/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './components/supplier/supplier-edit/supplier-edit.component';
import { SupplierShowComponent } from './components/supplier/supplier-show/supplier-show.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: TemplateComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'customers',
                component: CustomerIndexComponent
            },
            {
                path: 'customers/create',
                component: CustomerCreateComponent
            },
            {
                path: 'customers/:id/edit',
                component: CustomerEditComponent
            },
            {
                path: 'customers/:id',
                component: CustomerShowComponent
            },
            {
                path: 'suppliers',
                component: SupplierIndexComponent
            },
            {
                path: 'suppliers/create',
                component: SupplierCreateComponent
            },
            {
                path: 'suppliers/:id/edit',
                component: SupplierEditComponent
            },
            {
                path: 'suppliers/:id',
                component: SupplierShowComponent
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
