import { Component, OnInit } from '@angular/core';
import { Cart } from '../app-model/cart';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customerId;
  cart:Array<Cart> = new Array<Cart>();
  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    this.service.fetchCart(this.customerId).subscribe(
      response=> {
        console.log(response);
        this.cart = response;
      }
    )

  }

}
