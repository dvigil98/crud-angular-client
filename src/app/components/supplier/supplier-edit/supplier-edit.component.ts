import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-supplier-edit',
    templateUrl: './supplier-edit.component.html',
    styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent {

    form!: FormGroup;
    submitted = false;
    supplier!: Supplier;

    constructor(private fb: FormBuilder, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.initForm();
        const id = this.route.snapshot.paramMap.get('id');
        this.getSupplier(Number(id));
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

    getSupplier(id: number) {
        this.supplierService.getSupplier(id).subscribe({
            next: (response) => {
                this.supplier = response.data.supplier;
                this.form.patchValue(this.supplier);
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    updateSupplier() {
        this.submitted = true;
        if (this.form.valid) {

            this.supplier = {
                id: this.supplier.id,
                name: this.form.value.name,
                phone: this.form.value.phone,
                email: this.form.value.email,
                dni: this.form.value.dni,
                address: this.form.value.address
            };

            this.supplierService.updateSupplier(this.supplier.id, this.supplier).subscribe({
                next: (response) => {
                    Swal.fire({
                        title: 'ÉXITO!',
                        text: 'Datos actualizados',
                        icon: 'success'
                    });
                    this.router.navigate(['/admin/suppliers']);
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
