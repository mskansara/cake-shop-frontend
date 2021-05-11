import { Component, OnInit } from '@angular/core';
import { Cart } from '../app-model/cart';
import { OrderDto } from '../app-model/order-dto';
import { CustomerService } from '../customer.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerId;
  cartLength;
  finalAmount;
  cart:Array<Cart> = new Array<Cart>();
  cartId:number;
  orderDto:OrderDto = new OrderDto();
  today;
  pincode:string;
  constructor(private service:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    this.service.fetchCart(this.customerId).subscribe(
      response=> {
        console.log(response);
        this.cartId = response.cartId;
        this.cart = response.cartItems;
        this.cartLength = this.cart.length;
        this.finalAmount = this.calculateFinalAmount(this.cart);
        this.orderDto.deliveryTime = "9AM-10AM";
      }
    )

  }

  onDateChange(event)  {
    // console.log(event.target.value)
    this.orderDto.shippingDateTime = event.target.value;
  }

  onTimeChange(event) {
    this.orderDto.deliveryTime = event.target.options[event.target.options.selectedIndex].value;
  }

  calculateFinalAmount(cart:Array<Cart>):number {
    var amount = 0;
    cart.forEach((element)=> {
      amount+= (element.product.unitPrice*element.quantity);
    })
    return amount
  }

  placeOrder() {
    this.orderDto.cartId = this.cartId;
    this.orderDto.customerId = Number(localStorage.getItem('customerId'));
    this.orderDto.amount = this.finalAmount;
    this.orderDto.shippingAddress;
    console.log(this.orderDto);
    this.router.navigateByUrl('/viewOrders');
    this.service.placeOrder(this.orderDto).subscribe(
      response=> {
        console.log(response);
        Swal.fire({
          title: "Order Placed",
          text:"Your order has been placed successfully",
          icon: "success",
          confirmButtonText: "Okay"
        })

      }
    )
  }

}
