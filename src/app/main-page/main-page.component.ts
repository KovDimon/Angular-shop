import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { VideoApiService } from '../shared/services/video-api.service';
import { BooksApiService } from '../shared/services/books-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { Product } from '../shared/models/product';

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

    //Observable.

    combineLatest (
      this.videoApiService.getNewVideos(),
      this.booksApiService.getNewBooks(),
      this.gamesApiService.getNewGames()
      //this.gamesApiService.getGames();
    ).subscribe(
      newData => {
        this.newDataVideos = newData[0];
        this.newDataVideos.length = 6;
        this.newDataBooks = newData[1];
        this.newDataGames = newData[2];
        //this.newDataBooks.length = 6;
        console.log(this.newDataVideos);
        console.log(this.newDataBooks);
        console.log(this.newDataGames);
      },
      error => console.log("ERROR: data didn't work")
    );

    //this.year = this.date.getFullYear();
    /*this.videoApiService.getNewVideos()
    .subscribe(
      (newData: Product[]) => {
        this.newDataVideos = newData;
        console.log(newData);
      },
      error => console.log("ERROR: video search didn't work")
    );*/
 
    /*this.booksApiService.getBooks('new').subscribe(
      newData => this.newDataBooks = newData
    );*/

    //console.log(this.newDataBooks);
    //console.log(this.newDataVideos);
  }

}
