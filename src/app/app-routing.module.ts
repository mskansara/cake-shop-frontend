import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { CartComponent } from './cart/cart.component';
import { ChatComponent } from './chat/chat.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  { 
    path: "", component: HomeComponent 
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "product", component: ProductComponent
  },
  {
    path: "product-catalogue/:category", component:ProductCatalogueComponent
  },
  {
    path: "cart", component:CartComponent
  },
  {
    path: "viewOrders", component: ViewOrderComponent
  },
  {
    path: "checkout", component:CheckoutComponent
  },
  {
    path: "chat", component:ChatComponent
  },
  {
    path: "blog", component:BlogComponent
  },
  {
    path: "**", component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
