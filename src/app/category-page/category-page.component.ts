import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ObservableInput } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { CartService } from '../shared/services/cart.service';
import { Product } from '../shared/models/product.model';
import { Categories } from '../shared/models/categories.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit { 

  private nameCategory: string;

  private products: Product[] = [];

  private loaded: boolean = false;

  public categories: Categories = {};

  private maximumYear: string = '2018';

  private typeVideo: string = 'all';

  private minimumYear: string = '2018';

  private authorName: string = '';

  private readingTime: string = '';

  constructor(
    private route: ActivatedRoute, 
    private videoApiService: VideoApiService, 
    private booksApiService: BooksApiService, 
    private gamesApiService:GamesApiService, 
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.route.params.pipe(
      mergeMap((params:Params): ObservableInput<{}> => {

        this.categories.books = false;
        this.categories.video = false;
        this.categories.games = false;

        this.nameCategory = params['nameCategory'];
       
        switch(this.nameCategory){
          case 'video':  this.categories.video = true; return this.videoApiService.getNewVideo();
  
          case 'books': this.categories.books = true; return this.booksApiService.getNewBooks();
  
          case 'games': this.categories.games = true; return this.gamesApiService.getNewGames();
        }
      })
    ).subscribe(
      (dataProducts: Product[]) => {
        this.products = dataProducts;
        this.products.length = 9;
        this.loaded = true;
    });
    
  }

  public changeItems(params){

    switch(this.nameCategory){
      case 'video': this.videoApiService.searchVideo('new', params).subscribe(
        dataVideo => this.products = dataVideo,
        error => console.log("ERROR: data video don't got")
      ); break;
      
      case 'books': this.booksApiService.searchBooks('', params).subscribe(
        dataBooks => this.products = dataBooks,
        error => console.log("ERROR: data books don't got")
      ); break;

      case 'games': this.gamesApiService.searchGames('', params).subscribe(
        dataGames => this.products = dataGames,
        error => console.log("ERROR: data games don't got")
      );
    }
  }

  public resetItems(){
    switch(this.nameCategory){
      case 'video': this.videoApiService.getNewVideo().subscribe(
        dataVideo => this.products = dataVideo,
        error => console.log("ERROR: data video don't got")
      ); break;
      
      case 'books': this.booksApiService.getNewBooks().subscribe(
        dataBooks => this.products = dataBooks,
        error => console.log("ERROR: data books don't got")
      ); break;

      case 'games': this.gamesApiService.getNewGames().subscribe(
        dataGames => this.products = dataGames,
        error => console.log("ERROR: data games don't got")
      );
    }
  }

}
