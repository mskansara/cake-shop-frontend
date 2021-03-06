import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Customer } from '../app-model/customer';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer = new Customer();
  email: String = "";
  password: String = "";
  message: String;
  isLoggedIn:boolean;
  constructor(private service: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.service.currentStatus.subscribe(
      response => {
        this.isLoggedIn = response;
      }
    )

  }
  login(loginForm: NgForm){
      // this.customer.email = this.email;
      // this.customer.password = this.password;
      this.service.login(this.customer).subscribe(response =>{
        console.log(response);
          if(response.status == false){
            // alert(response.message);
            // console.log(this.customer.customerId);
            this.message = response.message;
            Swal.fire({
              title: "Login Failed",
               text:"Please check your credentials",
               icon: "error",
               confirmButtonText: "Okay"
           });
           loginForm.resetForm();
          }
          else{
            localStorage.setItem('customerId', String(response.customerId));
            localStorage.setItem('customerName', String(response.name));
            Swal.fire({
              title: "Login Success",
               text:"You are ready to buy some delicious desserts",
               icon: "success",
               confirmButtonText: "Okay"
           });
           this.service.changeStatus(true);
           this.router.navigate(['/']);
          //  window.location.replace('/');
           
           
          }
        }
      )
  }


}
