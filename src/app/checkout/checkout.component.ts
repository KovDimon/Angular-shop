import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product.model';
import { AuthService } from '../shared/services/auth.service';
import { Address } from '../shared/models/address.model';
import { Profile } from '../shared/models/profile.model';
import { AddressFormComponent } from '../shared/components/address-form/address-form.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private numberPage: number = 1;

  public windowWidth = '600px';

  public windowHeight = '620px';

  private isShowed: boolean = false;

  private discount: boolean = false;

  private isLoaded: boolean = false;

  private paymentIsLoaded: boolean = false;

  private selectedAddress: Address;

  private selectedPayment: string;

  private promoCode: string = '';

  private products: Product[] = [];

  private addresses: Address[] = [];

  private profile: Profile;

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
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.total = this.cartService.totalPrice();
      this.authService.getUser().subscribe(
        profile => {
          if(!profile){
            return;
          }
          this.profile = profile;
          this.addresses = profile.address;
          this.isLoaded = true;
        },
        err => console.log("ERROR: data profile don't come in Checkout")
      );
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

  public removeAddress(event){
    this.authService.removeAddress(event);
  }

  public saveAddress(event){
    this.authService.editAddress(event);
  }

  public savePromoCode(){
    if(this.promoCode){
      if(this.promoCode === this.profile.promoCode){
        this.discount = true;
        this.toastr.success('You have 25% discount!', 'Success!');
        this.cartService.modifyPriceProducts(this.profile.percent);
      }else{
        this.toastr.error('Invalid promocode!', 'Error!');
        this.promoCode = '';
      }
    }
  }

  public addAddress() {
    
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: this.windowWidth,
      height: this.windowHeight
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }else{
        this.authService.addAddress(result);
      }
    });
  }

  public cancelAddress(){
    this.isShowed = false;
  }

  public chooseAddress(address){
    this.selectedAddress = address;
  }

  public selectClass(address): boolean{
    if(this.selectedAddress){
      if(this.selectedAddress.id == address.id){
        return true;
      }
      
    }
      return false;
  }

  public choosePayment(payment){
    this.selectedPayment = payment;
  }

  public pay(){
    this.paymentIsLoaded = true;
    this.toastr.info('Order is processed...');
    setTimeout(()=> {
      this.paymentIsLoaded = false;
      this.router.navigate(['/confirmation'], {
        queryParams: {
          id: this.selectedAddress.id
         }
      });
    }, 5000);
  }
}
