import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

    @Output() searchEvent = new EventEmitter<any>();
    @Output() clearEvent = new EventEmitter<any>();

    searchData: any = {
        critery: '',
        value: ''
    };

    form!: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.initForm();
    }

    initForm(): FormGroup {
        return this.fb.group({
            critery: ['', [Validators.required]],
            value: ['', [Validators.required]]
        });
    }

    search() {
        this.submitted = true;
        if (this.form.valid) {

            this.searchData = {
                critery: this.form.value.critery,
                value: this.form.value.value
            };

            this.searchEvent.emit(this.searchData);

        } else {
            Swal.fire({
                title: 'UPS!',
                text: 'Llene los campos requeridos',
                icon: 'error'
            });
        }
    }

    clear() {
        this.submitted = false;
        this.form.reset();
        this.form.controls['critery'].setValue('');
        this.clearEvent.emit();
    }
}
