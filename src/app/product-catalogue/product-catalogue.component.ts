import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-catalogue',
  templateUrl: './product-catalogue.component.html',
  styleUrls: ['./product-catalogue.component.css']
})
export class ProductCatalogueComponent implements OnInit {
  category;
  constructor(private router:Router, private route:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.category = routeParams.get('category');
  }

}
