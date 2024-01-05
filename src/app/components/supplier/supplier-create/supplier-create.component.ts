import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

    form!: FormGroup;
    submitted = false;
    supplier!: Supplier;

    constructor(private fb: FormBuilder, private supplierService: SupplierService) {
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

    saveSupplier() {
        this.submitted = true;
        if (this.form.valid) {

            this.supplier = {
                id: 0,
                name: this.form.value.name,
                phone: this.form.value.phone,
                email: this.form.value.email,
                dni: this.form.value.dni,
                address: this.form.value.address
            };

            this.supplierService.saveSupplier(this.supplier).subscribe({
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
