import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartitemdto } from '../app-model/cartitemdto';
import { Product } from '../app-model/product';
import { Products } from '../app-model/products';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css']
})
export class ProductCatalogueComponent implements OnInit {
  category;
  products:Array<Products> = new Array();
  cartItemDto:Cartitemdto = new Cartitemdto();
  constructor(private router:Router, private route:ActivatedRoute, private service:CustomerService) {
    
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.category = routeParams.get('category');
    this.service.fetchProducts(this.category).subscribe(
      response=>{
        this.products = response;
        console.log(this.products);

      }
    )
  }

  addToCart(product:Products) {
    this.cartItemDto.customerId = Number(localStorage.getItem('customerId'));
    this.cartItemDto.productId = product.productId;
    this.cartItemDto.quantity = 1;
    this.service.addToCart(this.cartItemDto).subscribe(
      response=> {
        console.log(response);
      }
    )
    
  }

}
