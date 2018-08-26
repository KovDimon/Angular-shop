import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable, ObservableInput } from 'rxjs';

import { Product } from '../shared/models/product';
import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Categories } from '../shared/models/categories';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private products: Product[] = [];

  private loaded: boolean = false;

  private categories: Categories={};

  private isEmptySearch: boolean = false;

  private query: string;
  constructor(
    private route: ActivatedRoute,
    private videoApiService: VideoApiService,
    private booksApiService: BooksApiService,
    private gamesApiService: GamesApiService
  ) { }

  ngOnInit() {

    this.categories.books = true;
    this.categories.video = true;
    this.categories.games = true;

    this.changeItems();

  }

  private changeItems(parametrs?){
    this.loaded = false;
    this.isEmptySearch = false;
    console.log(parametrs);

    this.route.queryParams.pipe(mergeMap(
      (params: Params): ObservableInput<any> => {
        this.query = params.query;
        console.log(parametrs);
        return combineLatest(
          this.videoApiService.searchVideo(params.query, parametrs),
          this.booksApiService.searchBooks(params.query, parametrs),
          this.gamesApiService.searchGames(params.query, parametrs)
        )
      })).subscribe(
      data => {
        console.log(data);
        if (this.categories.video) {
          if(data[0].length > 6){
              data[0].length = 6;
          }
          this.products = data[0];
        }

        if (this.categories.books) {
          if(data[1].length > 6){
              data[1].length = 6;
          }
          this.products = this.products.concat(data[1]);
        }

        if (this.categories.games) {
          if(data[2].length > 6){
              data[2].length = 6;
          }
          this.products = this.products.concat(data[2]);
        }
          //console.log(this.isEmptySearch)
          if(!this.products.length){
            this.isEmptySearch = true;
          }
          //console.log(this.isEmptySearch)
        this.loaded = true;
    });
  }

  public resetItems(){
    this.categories.books = true;
    this.categories.video = true;
    this.categories.games = true;

    this.changeItems();
  }

}
