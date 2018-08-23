import { Component, OnInit } from '@angular/core';

import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private listProducts: Product[] = [];

  private total: number;

  private profile: any;

  constructor(
    private cartService: CartService,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.listProducts = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
    if(localStorage.getItem('id_token')){
      this.authService.getUser((err, profile) => this.profile = profile);
    }
  }

  public deleteProduct(product:Product){
    console.log(product);
    this.cartService.removeProduct(product);
    this.listProducts = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
  }

  public checkout(){
    this.route.navigate(['/checkout']);
  }

}
