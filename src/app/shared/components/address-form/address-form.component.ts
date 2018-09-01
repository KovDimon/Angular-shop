import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  public address: Address;

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddressFormComponent>,
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

  public add() {

    this.dialogRef.close({
      id: this.authService.makeId(),
      country: this.country,
      streetAddress: this.streetAddress,
      city: this.city,
      zip: this.zip,
      state: this.state
    });
  }

}
