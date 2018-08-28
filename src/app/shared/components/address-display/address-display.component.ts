import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Address } from '../../models/address.model';

@Component({
  selector: 'app-address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.scss']
})
export class AddressDisplayComponent implements OnInit {

  @Input() address: Address;

  @Output() removeAddress = new EventEmitter<any>();

  @Output() saveAddress = new EventEmitter<any>();

  private isEdit: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  public delete(address){
    this.removeAddress.emit(address);
  }

  public edit(address){
    this.isEdit = true;
  }

  public save(address){
    this.isEdit = false;
    this.saveAddress.emit(address);
  }

}
