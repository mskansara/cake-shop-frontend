import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

}
