import { Component, OnInit } from '@angular/core';
import { Category } from '../app-model/category';
import { Product } from '../app-model/product';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  category:Category = new Category();
  product:Product = new Product();
  categories:String[];
  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.product.categoryName = 'Cake';
    console.log(this.product.categoryName);
    this.service.fetchCategoryNames().subscribe(
      response=> {
        console.log(response);
        this.categories = response;
        console.log(this.categories);
      }
    )
  }

  onFileChange(event) {
    this.product.image = event.target.files[0];
    console.log(this.product.image);
  }

  onDataChange(event) {
    this.product.categoryName = event.target.options[event.target.options.selectedIndex].value;
    console.log(this.product.categoryName);
  }

  addCategory() {
    console.log(this.category.name);
    this.service.addCategory(this.category).subscribe(
      response=> {
        console.log(response);
        this.ngOnInit();
      }
    )
  }

  addProduct() {
    let formData:FormData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('categoryName', this.product.categoryName);
    formData.append('image', this.product.image);
    formData.append('unitPrice', String(this.product.unitPrice));

    this.service.addProduct(formData).subscribe(
      response=> {
        console.log(response);
        this.ngOnInit();
      }
    )

  }

}
