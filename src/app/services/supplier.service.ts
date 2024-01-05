import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../contracts/iresponse';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

    private baseUrl: string = 'http://localhost:8000/api/suppliers';

    constructor(private http: HttpClient) {
    }

    getSuppliers(): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}`);
    }

    saveSupplier(supplier: Supplier): Observable<IResponse> {
        return this.http.post<IResponse>(`${this.baseUrl}`, supplier);
    }

    getSupplier(id: number): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}/${id}`);
    }

    updateSupplier(id: number, supplier: Supplier): Observable<IResponse> {
        return this.http.put<IResponse>(`${this.baseUrl}/${id}`, supplier);
    }

    deleteSupplier(id: number): Observable<IResponse> {
        return this.http.delete<IResponse>(`${this.baseUrl}/${id}`);
    }

    searchSupplier(critery: string, value: string): Observable<IResponse> {
        return this.http.get<IResponse>(`${this.baseUrl}/${critery}/${value}/search`);
    }
}
