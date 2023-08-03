import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-index',
    templateUrl: './customer-index.component.html',
    styleUrls: ['./customer-index.component.css']
})
export class CustomerIndexComponent implements OnInit {

    p: number = 1;
    customers: Customer[] = [];

    constructor(private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers() {
        this.customerService.getCustomers().subscribe({
            next: (response) => {
                this.customers = response.data.customers;
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    deleteCustomer(id: number) {
        Swal.fire({
            title: 'ADVERTENCIA!',
            text: "¿Seguro de eliminar este registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#343a40',
            confirmButtonText: '<i class="fas fa-check"></i> Eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.customerService.deleteCustomer(id).subscribe({
                    next: (response) => {
                        this.ngOnInit();
                        Swal.fire({
                            title: 'ÉXITO!',
                            text: 'Datos eliminados',
                            icon: 'success'
                        });
                    },
                    error: (e) => {
                        console.log(e);
                    }
                });
            }
        })
    }

    searchCustomer(searchData: any) {
        this.customerService.searchCustomer(searchData.critery, searchData.value).subscribe({
            next: (response) => {
                this.customers = response.data.customers
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    clear() {
        this.ngOnInit();
    }
}
