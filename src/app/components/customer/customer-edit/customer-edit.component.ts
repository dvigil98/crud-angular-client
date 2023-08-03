import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    customer!: Customer;

    constructor(private fb: FormBuilder, private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.initForm();
        const id = this.route.snapshot.paramMap.get('id');
        this.getCustomer(Number(id));
    }

    initForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            dni: ['', [Validators.required]],
            address: ['', [Validators.required]]
        });
    }

    getCustomer(id: number) {
        this.customerService.getCustomer(id).subscribe({
            next: (response) => {
                this.customer = response.data.customer;
                this.form.patchValue(this.customer);
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    updateCustomer() {
        this.submitted = true;
        if (this.form.valid) {

            this.customer = {
                id: this.customer.id,
                name: this.form.value.name,
                phone: this.form.value.phone,
                email: this.form.value.email,
                dni: this.form.value.dni,
                address: this.form.value.address
            };

            this.customerService.updateCustomer(this.customer.id, this.customer).subscribe({
                next: (response) => {
                    Swal.fire({
                        title: 'ÉXITO!',
                        text: 'Datos actualizados',
                        icon: 'success'
                    });
                    this.router.navigate(['/admin/customers']);
                },
                error: (e) => {
                    console.log(e);
                }
            });

        } else {
            Swal.fire({
                title: 'UPS!',
                text: 'Llene los campos requeridos',
                icon: 'error'
            });
        }
    }
}
