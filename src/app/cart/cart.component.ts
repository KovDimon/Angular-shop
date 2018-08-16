import { Component, OnInit } from '@angular/core';

import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private listProducts: Product[] = [];

  private total: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.listProducts = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
  }

  /*public sumPrice(){
    this.listProducts.forEach(obj => this.sum += obj.price);
  }*/

  deleteProduct(product){
    console.log(event);
    this.cartService.removeProduct(product);
    this.listProducts = this.cartService.getCart();
  }

}
