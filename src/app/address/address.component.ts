import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';
import { Address } from '../shared/models/address.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddressFormComponent } from '../shared/components/address-form/address-form.component';

export interface DialogData {
  address: Address;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  private addresses: Address[] = [];

  public address:Address;

  private profile: Profile;

  private isShowed: boolean = false;

  private isLoaded: boolean = false;

  public windowWidth = '600px';

  public windowHeight = '620px';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
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

  public removeAddress(event){
    this.authService.removeAddress(event);
  }

  public saveAddress(event){
    this.authService.editAddress(event);
  }

  public cancelAddress(){
    this.isShowed = false;
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
}
