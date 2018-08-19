import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';

import { Product } from '../shared/models/product';
import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Categories } from '../shared/models/categories';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private products: Product[] = [];

  private loaded: boolean = false;

  private categories: Categories={};

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

    this.route.queryParams.pipe()
    .subscribe(
      (params: Params) => {
        console.log('Data', params);
        this.search(params);
        this.loaded = true;
    });
  }

  private search(params: Params){

    combineLatest(
      this.videoApiService.searchVideo(params.query),
      this.booksApiService.searchBooks({name: params.query})
      //games
    ).subscribe(
      data => {

        if (params.video) {
          if(data[0]){
            data[0].length = 6
            this.products = data[0];
          }
        }

        if (params.books) {
          if(data[1]){
            data[1].length = 6
            this.products.concat(data[1]);
          }
        }
        console.log(this.products);
      });

    /*let observables = [];
    if (params.video) {
      observables.push(this.videoApiService.searchVideo(params.query));
    }
    if (params.books) {
      observables.push(this.booksApiService.searchBooks({name: params.query}));
    }*/
    /*if (params.games) {
      observables.push(.search(params.query, movieFilter));
    }*/
  }

}
