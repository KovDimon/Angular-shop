import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product';
import { AuthService } from '../shared/services/auth.service';
import { Address } from '../shared/models/address.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private numberPage: number = 1;

  private products: Product[] = [];

  private addresses: Address[] = [];

  private total:number;

  private paymentTypes: string[] = [
    'PayPal',
    'CreditCard',
    'Cash',
    'WebMoney',
    'QIWI',
    'Bitcoin'
  ];

  constructor(
    private cartService:CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
    if(localStorage.getItem('id_token')){
      this.authService.getUser((err, profile) => this.addresses = profile.address);
    }
  }

  public previos(){
    if(this.numberPage-- < 1){
      this.numberPage = 1;
    }
  }

  public next(){
    if(this.numberPage++ > 3){
      this.numberPage = 3;
    }
  }

  public addAddress(event){

    this.authService.addAddress(event);
  }

  public removeAddress(event){
    this.authService.removeAddress(event);
  }

  public saveAddress(event){
    this.authService.editAddress(event);
  }

}
