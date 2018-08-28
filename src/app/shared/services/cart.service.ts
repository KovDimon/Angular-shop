import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  private productCart: Product[] = [];

  private counter: number = 0;

  constructor() {
    try {
      if (JSON.parse(localStorage.getItem('cart'))) {
        this.productCart = JSON.parse(localStorage.getItem('cart'));
      } else {
        this.productCart = [];
      }
    } catch (e) {
      console.log(e);
      console.log('Failed to get the goods', 'Error!');
    }
   }

  ngOnInit(){
  }

  public addProduct(product: Product){
    let foundProduct = this.productCart.find(obj => product.id === obj.id && product.type === obj.type);

    if (foundProduct) {
      foundProduct.count += 1;
    } else {
      product.count = 1;
      this.productCart.push(product);
    }
    this.modifyLocalStorage();
  }

  public getCart(): Product[]{
    return this.productCart;
  }

  public totalPrice(): number{
    let total = 0;
    this.productCart.forEach((obj) => {
      total += obj.price*obj.count;
    });
    return total;
  }

  public removeProduct(product: Product) {
    const foundProduct = this.productCart.find((obj) => product.id === obj.id && product.type === obj.type);
    if (foundProduct.count > 1) {
      foundProduct.count -= 1;
    } else {
      this.productCart.splice(this.productCart.indexOf(foundProduct), 1);
    }
    this.modifyLocalStorage();
  }

  public count(): number{
    let count = 0;
    this.productCart.forEach((obj) => count += obj.count);
    return count;
  } 

  public modifyPriceProducts(discountPercent: number){
    this.productCart.forEach(obj => obj.price = obj.price-obj.price*discountPercent/100);
    this.modifyLocalStorage();
  }

  public clearCart(){
    this.productCart = [];
    this.modifyLocalStorage();
  }

  public modifyLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(this.productCart));
  }
}
