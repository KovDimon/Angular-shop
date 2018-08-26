import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { Profile } from 'selenium-webdriver/firefox';
import { mergeMap } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';
import { Address } from '../shared/models/address.model';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  private isLoaded: boolean = false;

  private idAddress: string;

  private address: Address;

  private userFirstName: string;

  private userLastName: string;

  //private date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('id_token')){
      this.route.queryParams.pipe(mergeMap(
          (params: Params): ObservableInput<any> => {
            this.idAddress = params.id;
            console.log(this.idAddress);
            return this.authService.getUser();
          }
      )).subscribe(
        dataProfile => {
          console.log(dataProfile);
          this.address = dataProfile.address.find(obj => obj.id === this.idAddress);
          this.userFirstName = dataProfile.firstName;
          this.userLastName = dataProfile.lastName;
          this.toastr.success('Your order has been successfully processed', 'Success!');
          this.isLoaded = true;
        },
        err => console.log("ERROR: data profile don't come in Confirmation")
      );
    }
  }

  public getDate(): string{
    let date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    console.log(date);
    date.setDate(date.getDate() + 14);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}
