import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  customerId;
  name;
  isLoggedIn:boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.customerId = localStorage.getItem('customerId');
    this.name = localStorage.getItem('customerName');
    if(this.customerId != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false
    }
    console.log(this.customerId);
  }

  logout() {
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerName');
    this.router.navigateByUrl('/');
  }

}
