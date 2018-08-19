import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private counter: number = 0;

  constructor(
    private cartService: CartService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  public count(): number{
    return this.cartService.count();
  }

  public search(form: NgForm){

    /*this.route.params.subscribe(
      params => console.log(params)
    );*/

    this.router.navigate(['./search'], {
      queryParams: {
        query: form.value.search,
        books: true,
        games: true,
        video: true
      }
    });
  }
}
