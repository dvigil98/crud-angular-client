import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-create',
    templateUrl: './customer-create.component.html',
    styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    customer!: Customer;

    constructor(private fb: FormBuilder, private customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.form = this.initForm();
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

    saveCustomer() {
        this.submitted = true;
        if (this.form.valid) {

            this.customer = {
                id: 0,
                name: this.form.value.name,
                phone: this.form.value.phone,
                email: this.form.value.email,
                dni: this.form.value.dni,
                address: this.form.value.address
            };

            this.customerService.saveCustomer(this.customer).subscribe({
                next: (response) => {
                    this.submitted = false;
                    this.form.reset();
                    Swal.fire({
                        title: 'ÉXITO!',
                        text: 'Datos guardados',
                        icon: 'success'
                    });
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
