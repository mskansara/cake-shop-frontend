import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './app-model/customer';
import { LoginStatus } from './app-model/login-status';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  login(customer:Customer):Observable<LoginStatus>{
    return this.httpClient.post<LoginStatus>("http://localhost:8181/login",customer);
  }

  register(customer:Customer):Observable<Customer> {
    return this.httpClient.post<Customer>("http://localhost:8181/register",customer);
  }
}
