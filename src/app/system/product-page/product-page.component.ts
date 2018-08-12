import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { VideoApiService } from '../../shared/services/video-api.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  private id: string;

  private nameCategory: string;

  private productData: any;

  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private videoApiService: VideoApiService) { }

  ngOnInit() {
    /*this.route.params.subscribe(
      (params: Params) => {
        this.nameCategory = params['nameCategory'];
        this.id = params['id'];
        this.loaded = true;
      }
    );*/
    this.id = this.route.snapshot.params['id'];
    this.nameCategory = this.route.snapshot.params['nameCategory'];
    this.runService();
    
  }
  public runService(){
      switch(this.nameCategory){
        case 'video': this.videoApiService.getVideo(this.id).subscribe(
          videoData => {this.productData = videoData; console.log(this.productData); this.loaded = true;},
          error => console.log("ERROR: video data dont't got")
        ); break;
      }
  }

}
