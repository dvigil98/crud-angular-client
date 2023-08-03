import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../contracts/iresponse';
import { Customer } from '../models/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private baseUrl: string = 'http://localhost:8000/api/customers';

    constructor(private http: HttpClient) {
    }

    getCustomers(): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}`);
    }

    saveCustomer(customer: Customer): Observable<IResponse> {
        return this.http.post<IResponse>(`${this.baseUrl}`, customer);
    }

    getCustomer(id: number): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}/${id}`);
    }

    updateCustomer(id: number, customer: Customer): Observable<IResponse> {
        return this.http.put<IResponse>(`${this.baseUrl}/${id}`, customer);
    }

    deleteCustomer(id: number): Observable<IResponse> {
        return this.http.delete<IResponse>(`${this.baseUrl}/${id}`);
    }

    searchCustomer(critery: string, value: string): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}/${critery}/${value}/search`);
    }
}
