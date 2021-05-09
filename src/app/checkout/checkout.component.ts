import { Component, OnInit } from '@angular/core';
import { Cart } from '../app-model/cart';
import { OrderDto } from '../app-model/order-dto';
import { CustomerService } from '../customer.service';

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
  orderDto:OrderDto = new OrderDto();
  today;
  pincode:string;
  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.customerId = Number(localStorage.getItem('customerId'));
    this.service.fetchCart(this.customerId).subscribe(
      response=> {
        console.log(response);
        this.cart = response;
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
    this.orderDto.cartId = this.cart[0].cart.cartId;
    this.orderDto.customerId = Number(localStorage.getItem('customerId'));
    this.orderDto.amount = this.finalAmount;
    this.orderDto.shippingAddress += 
    console.log(this.orderDto);
    this.service.placeOrder(this.orderDto).subscribe(
      response=> {
        console.log(response);
      }
    )
  }

}
