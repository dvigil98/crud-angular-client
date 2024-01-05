import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-show',
  templateUrl: './supplier-show.component.html',
  styleUrls: ['./supplier-show.component.css']
})
export class SupplierShowComponent implements OnInit {

    supplier: Supplier = {
        id: 0,
        name: '',
        phone: '',
        email: '',
        dni: '',
        address: ''
    };

    constructor(private supplierService: SupplierService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.getSupplier(Number(id));
    }

    getSupplier(id: number) {
        this.supplierService.getSupplier(id).subscribe({
            next: (response) => {
                this.supplier = response.data.supplier;
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    deleteSupplier(id: number) {
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
                this.supplierService.deleteSupplier(id).subscribe({
                    next: (response) => {
                        Swal.fire({
                            title: 'ÉXITO!',
                            text: 'Datos eliminados',
                            icon: 'success'
                        });
                        this.router.navigate(['/admin/suppliers']);
                    },
                    error: (e) => {
                        console.log(e);
                    }
                });
            }
        })
    }
}
