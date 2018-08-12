import { Component, OnInit } from '@angular/core';
import { VideoApiService } from '../shared/services/video-api.service';
import { GamesApiService } from '../shared/services/games-api.service';
import { BooksApiService } from '../shared/services/books-api.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(private videoApiService: VideoApiService, private gamesApiService: GamesApiService,private booksApiService: BooksApiService) { }

  ngOnInit() {
    /*this.videoApiService.getVideo("y=2018&t=r")
    .subscribe(
      videoData => console.log(videoData),
      error => console.log("ERROR: video data dont't get")
    );*/

    /*this.videoApiService.searchVideo("s=max&y=2018")
    .subscribe(
      videoData => console.log(videoData),
      error => console.log("ERROR: video data dont't got")
    );*/

    /*this.gamesApiService.postGames()
    .subscribe(
      data => console.log(data),
      error => console.log('ERROR post')

    );*/
    /*this.gamesApiService.getGames("franchises")
    .subscribe(
      gamesData => console.log(gamesData),
      error => console.log("ERROR: games data dont't got")
    );*/

    /*this.booksApiService.getBooks("franchises")
    .subscribe(
      booksData => console.log(booksData),
      error => console.log("ERROR: books data dont't got"));*/
  }

}
