import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-show',
    templateUrl: './customer-show.component.html',
    styleUrls: ['./customer-show.component.css']
})
export class CustomerShowComponent implements OnInit {

    customer: Customer = {
        id: 0,
        name: '',
        phone: '',
        email: '',
        dni: '',
        address: ''
    };

    constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.getCustomer(Number(id));
    }

    getCustomer(id: number) {
        this.customerService.getCustomer(id).subscribe({
            next: (response) => {
                this.customer = response.data.customer;
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
                        Swal.fire({
                            title: 'ÉXITO!',
                            text: 'Datos eliminados',
                            icon: 'success'
                        });
                        this.router.navigate(['/admin/customers']);
                    },
                    error: (e) => {
                        console.log(e);
                    }
                });
            }
        })
    }
}
