import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material';

import { Address } from '../../models/address.model';
import { AuthService } from '../../services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  form: FormGroup;

  @Output() cancelAddress = new EventEmitter<any>();
  @Output() addAddress = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  private country: string = '';

  private state: string = '';

  private zip: string = '';

  private streetAddress: string = '';

  private city: string = '';

  private matcher;

  ngOnInit() {
    this.form = new FormGroup({
      'country': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'zip': new FormControl(null, [Validators.required]),
      'streetAddress': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required])
    });

    this.matcher = new MyErrorStateMatcher();
  }

  public add(form){
    this.toastr.success('Address update to profile!', 'Success!');
    this.addAddress.emit({
      id: this.authService.makeId(),
      country: this.country,
      streetAddress: this.streetAddress,
      city: this.city,
      zip: this.zip,
      state: this.state
    });
    this.city = '';
    this.country = '';
    this.streetAddress = '';
    this.zip = '';
    this.state = '';
  }

  public cancel(){
    this.cancelAddress.emit();
  }

}
