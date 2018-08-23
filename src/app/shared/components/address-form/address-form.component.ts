import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Address } from '../../models/address.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  form: FormGroup;

  @Input() 
  @Output('') addAddress = new EventEmitter<any>();

  constructor() { }

  private country: string = '';

  private state: string = '';

  private zip: string = '';

  private streetAddress: string = '';

  private city: string = '';

  ngOnInit() {
    this.form = new FormGroup({
      'country': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'zip': new FormControl(null, [Validators.required]),
      'streetAddress': new FormControl(null, [Validators.required]),
      'state': new FormControl(null, [Validators.required])
    });
  }

  public add(form){
    this.addAddress.emit({
      id: this.makeId(),
      country: this.country,
      streetAddress: this.streetAddress,
      city: this.city,
      zip: this.zip,
      state: this.state
    });
    console.log(form);
    this.city = '';
    this.country = '';
    this.streetAddress = '';
    this.zip = '';
    this.state = '';
  }

  private makeId(): string{
    return Math.random().toString(36).substr(2,16);
  }

}
