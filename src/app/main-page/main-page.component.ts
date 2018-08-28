import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private newDataVideos: Product[] = [];

  private newDataBooks: Product[] = [];

  private newDataGames: Product[] = [];

  constructor(private videoApiService: VideoApiService, private booksApiService: BooksApiService, 
    private gamesApiService:GamesApiService) { }

  ngOnInit() {

    combineLatest (
      this.videoApiService.getNewVideo(),
      this.booksApiService.getNewBooks(),
      this.gamesApiService.getNewGames()
    ).subscribe(
      newData => {
        this.newDataVideos = newData[0];
        this.newDataVideos.length = 6;
        this.newDataBooks = newData[1];
        this.newDataBooks.length = 6;
        this.newDataGames = newData[2];
        this.newDataGames.length =6;
      },
      error => console.log("ERROR: data didn't work")
    );
  }

}
