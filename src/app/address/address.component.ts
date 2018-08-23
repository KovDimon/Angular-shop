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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('id_token')){
      this.authService.getUser((err, profile) => this.addresses = profile.address);
    }
    
    //this.addresses = this.profile; 
    console.log(this.addresses);
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
