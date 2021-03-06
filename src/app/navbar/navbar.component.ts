import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customerId;
  name;
  isLoggedIn:boolean;
  cartLength;
  constructor(private router:Router, private service:CustomerService) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.service.currentStatus.subscribe(
      response=> {
        // console.log(response);
        this.isLoggedIn = response;
        console.log(response);
        if(response == true || localStorage.getItem('customerId')!=null) {
          this.customerId = localStorage.getItem('customerId');
          this.name = localStorage.getItem('customerName');
          console.log(this.customerId);
          this.service.fetchCart(this.customerId).subscribe(
            response=> {
              if(response == null) {
                this.cartLength = 0;
              } else {
                this.cartLength = response.cartItems.length;
              }
            }
          )
        } else {
          this.isLoggedIn = false
          this.cartLength = 0
        }
      }
    )
    
  }
  cartPage(){
    if(this.cartLength != 0){
      this.router.navigateByUrl('/cart');
    }
    else{
      //alert("No items in cart");
      Swal.fire({
        title: "Cart Empty!",
         text:"Please add products to the cart",
         icon: "warning",
         confirmButtonText: "Okay"
     });
      this.router.navigateByUrl('/home');
    }
  }


  logout() {
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerName');
    this.service.changeStatus(false);
    this.ngOnInit();
    this.router.navigateByUrl('/');
    
  }

}
