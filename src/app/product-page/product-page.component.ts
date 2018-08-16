import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Product } from '../shared/models/product';
import { mergeMap } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';
import { CartService } from '../shared/services/cart.service';


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

  constructor(private route: ActivatedRoute, private videoApiService: VideoApiService, private booksApiService: BooksApiService, 
    private gamesApiService:GamesApiService, private cartService: CartService) { }

  ngOnInit() {
    /*this.route.params.subscribe(
      (params: Params) => {
        this.nameCategory = params['nameCategory'];
        this.id = params['id'];
        //this.loaded = true;
      }
    );
    this.runService();*/

    this.route.params.pipe(
      mergeMap((params:Params): ObservableInput<{}> => {
        this.nameCategory = params['nameCategory'];
        this.id = params['id'];
        switch(this.nameCategory){
          case 'video': return this.videoApiService.getVideo(this.id);
  
          case 'books': return this.booksApiService.getBook(this.id);
  
          case 'game': return this.gamesApiService.getGame(this.id);
        }
      })
    ).subscribe(
      (dataProduct: Product) => {
        console.log('Data', dataProduct);
        this.product = dataProduct;
        this.loaded = true;
    });
  }

  public buyProduct(){

    this.bought = true;
    this.cartService.addProduct(this.product);
    setTimeout(() => this.bought = false, 1500);

  }
}
