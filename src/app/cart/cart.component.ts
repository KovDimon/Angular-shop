import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product.model';
import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private listProducts: Product[] = [];

  private total: number;

  private profile: Profile;

  private isLoaded: boolean = false;

  constructor(
    private cartService: CartService,
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listProducts = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
    this.authService.getUser().subscribe(
      profile =>{ 
        this.profile = profile ? profile : new Profile().currency = 'USD';
        this.isLoaded = true;
      },
      err => console.log("ERROR: data profile don't come in Cart")
    );
  }

  public deleteProduct(product:Product){
    this.toastr.success(`${product.title} is removed from cart`, 'Success!');
    this.cartService.removeProduct(product);
    this.listProducts = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
  }

  public checkout(){
    this.route.navigate(['/checkout']);
  }

}
