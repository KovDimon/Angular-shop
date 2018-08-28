import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ObservableInput, combineLatest, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Product } from '../shared/models/product.model';
import { CartService } from '../shared/services/cart.service';
import { AuthService } from '../shared/services/auth.service';
import { Profile } from '../shared/models/profile.model';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  private id: string;

  private nameCategory: string;

  loaded: boolean = false;

  private product: Product;

  private bought: boolean = false;

  private text: boolean = false;

  private profile: Profile;

  constructor(
    private route: ActivatedRoute, 
    private videoApiService: VideoApiService, 
    private booksApiService: BooksApiService, 
    private gamesApiService:GamesApiService, 
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.route.params.pipe(
      mergeMap((params:Params): ObservableInput<{}> => {
        if(localStorage.getItem('id_token')){
          return combineLatest(
            this.getProduct(params),
            this.authService.getUser()
          )
          }else{
            let profile = new Profile();
            profile.currency = 'USD';
            return combineLatest(
              this.getProduct(params),
              of(profile)
            )
            
          }
      })
    ).subscribe(
      (data) => {
        this.product = data[0];
        this.profile = data[1];
        this.loaded = true;
    });
  }

  public buyProduct(){

    this.toastr.success(`${this.product.title} added to cart`, 'Success!');
    this.bought = true;
    this.cartService.addProduct(this.product);
    setTimeout(() => this.bought = false, 1500);
  }

  private showTextBook(event){
    event.preventDefault();
    this.text ? this.text =false : this.text = true;
  }

  private getProduct(params): Observable<any>{
    this.nameCategory = params['nameCategory'];
    this.id = params['id'];
    switch(this.nameCategory){
      case 'video': return this.videoApiService.getVideo(this.id);

      case 'books': return this.booksApiService.getBook(this.id);

      case 'games': return this.gamesApiService.getGame(this.id);
    }
  }

  private checkUser(){
    if(localStorage.getItem('id_token')){
    this.authService.getUser()
    }
  }

  public filteredWebsites(): any[]{
    return this.product.websites = this.product.websites.filter(
      obj => {
        return (obj.category == 1 ||
        obj.category == 4 ||
        obj.category == 5 ||
        obj.category == 8 ||
        obj.category == 9);
      });
  }
}
