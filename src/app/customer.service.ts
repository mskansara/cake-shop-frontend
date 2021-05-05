import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './app-model/customer';
import { LoginStatus } from './app-model/login-status';
import { Category } from './app-model/category';

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

  addCategory(category:Category):Observable<Category> {
    return this.httpClient.post<Category>("http://localhost:8181/addCategory",category);
  }

  addProduct(product:FormData):Observable<any> {
    return this.httpClient.post<any>("http://localhost:8181/addProduct",product);
  }

  fetchCategoryNames():Observable<String[]> {
    return this.httpClient.get<String[]>("http://localhost:8181/fetchCategory");
  }
}
