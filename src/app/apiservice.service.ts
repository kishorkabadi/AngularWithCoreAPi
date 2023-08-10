import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModule } from './customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'https://getinvoices.azurewebsites.net/api/';//or url of asp.net core api project

  constructor(private http: HttpClient) { }

  // Customer
  getCustomerList(): Observable<CustomerModule[]> {
    return this.http.get<any[]>(this.apiUrl + 'Customers');
  }
  getCustomer(id: any): Observable<CustomerModule> {
    return this.http.get<CustomerModule>(this.apiUrl + 'Customer/'+id);
  }

  addCustomer(emp: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'Customer', emp, httpOptions);
  }

  updateCustomer(emp: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'Customer/'+emp.id, emp, httpOptions);
  }

  deleteCustomer(empId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl + 'Customer/' + empId, httpOptions);
  }
}
