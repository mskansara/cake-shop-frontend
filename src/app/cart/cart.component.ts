import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../app-model/cart';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customerId;
  cart:any;
  cartItems:Array<any> = new Array<any>();
  constructor(private service:CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    this.service.fetchCart(this.customerId).subscribe(
      response=> {
        console.log(response.cartItems);
        this.cartItems = response.cartItems;
        
      }
      
    )

  }
  
}
