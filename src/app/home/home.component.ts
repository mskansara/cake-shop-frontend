import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryNames:String[];
  constructor(private router:Router, private service:CustomerService) { }

  ngOnInit(): void {
    this.service.fetchCategoryNames().subscribe(
      response => {
        this.categoryNames = response;
      }
    )
  }

  selectCategory(category:string) {
    console.log(category);
    //call service method
    this.router.navigate(['/product-catalogue/'+category]);
  }

}
