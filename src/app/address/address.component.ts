import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';
import { Address } from '../shared/models/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  private addresses: Address[] = [];

  private profile: Profile;

  private isShowed: boolean = false;

  private isLoaded: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
      this.authService.getUser().subscribe(
        profile =>{
          if(!profile){
            return;
          }
          this.addresses = profile.address;
          this.isLoaded = true;
        },
        err => console.log("ERROR: data profile don't come in Address")
      );
  }

  public addAddress(event){
    this.isShowed = false;
    this.authService.addAddress(event);
  }

  public removeAddress(event){
    this.authService.removeAddress(event);
  }

  public saveAddress(event){
    this.authService.editAddress(event);
  }

  public cancelAddress(){
    this.isShowed = false;
  }

  public add(){
    this.isShowed = true;
  }
}
