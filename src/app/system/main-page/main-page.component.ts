import { Component, OnInit } from '@angular/core';
import { VideoApiService } from '../../shared/services/video-api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private searchData = [];

  private date = new Date();

  private nameCategory: string = 'video';

  constructor(private videoApiService: VideoApiService) { }

  ngOnInit() {

    //this.year = this.date.getFullYear();
    this.videoApiService.searchVideo(`s=new&y=${this.date.getFullYear()}`)
    .subscribe(
      searchData => {
        this.searchData = searchData.Search;
        this.searchData.length = 6;
        //console.log(searchData);
      },
      error => console.log("ERROR: video search didn't work")
    );

    //console.log(this.searchData);
  }

}
