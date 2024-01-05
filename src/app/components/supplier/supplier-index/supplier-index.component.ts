import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-index',
  templateUrl: './supplier-index.component.html',
  styleUrls: ['./supplier-index.component.css']
})
export class SupplierIndexComponent implements OnInit {

    p: number = 1;
    suppliers: Supplier[] = [];

    constructor(private supplierService: SupplierService) {
    }

    ngOnInit(): void {
        this.getSuppliers();
    }

    getSuppliers() {
        this.supplierService.getSuppliers().subscribe({
            next: (response) => {
                this.suppliers = response.data.suppliers;
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

    searchSupplier(searchData: any) {
        this.supplierService.searchSupplier(searchData.critery, searchData.value).subscribe({
            next: (response) => {
                this.suppliers = response.data.suppliers
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
