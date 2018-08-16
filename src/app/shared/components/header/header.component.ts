import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private counter: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    /*this.cartService.counCart().subscribe(
      count => this.counter = count,
      error => console.log("ERROR: count don't work" )
    )*/
  }

  public count(): number{
    return this.cartService.count();
  }
}
