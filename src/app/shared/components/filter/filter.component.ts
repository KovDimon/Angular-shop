import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from '../../models/categories';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input('') categories;

  @Input('') namePage: string; 

  @Output('') filterItems = new EventEmitter<object>();

  @Output('') resetItems = new EventEmitter<any>();

  private maximumDate: string = '';

  private typeVideo: string = 'all';

  private minimumDate: string = '';

  private yearOfRelease: string = '2018'

  private authorName: string = '';

  private readingTime: string = '';

  private gamesRating : string ='';

  constructor() { }

  ngOnInit() {
  }
 
  changeParametrs(){

    //this.maximumDate ? this.maximumDate : this.maximumDate = '01.01.2018';
    //this.minimumDate ? this.minimumDate : this.minimumDate = '01.01.2018';
    /*const params:Object;

    switch(this.nameCategory){
      case 'video': params.yearOfRelease = this.maximumDate.slice(0,-4); params.typeVideo = this.typeVideo; break;
    }*/
    console.log(this.maximumDate.slice(6,10));
    this.filterItems.emit({
      yearOfRelease: this.maximumDate.slice(6,10),
      typeVideo: this.typeVideo,
      maximumDate: this.maximumDate ? `${this.maximumDate.slice(6,10)}-${this.maximumDate.slice(3,5)}-${this.maximumDate.slice(0,2)}` : '',
      minimumDate: this.minimumDate ? `${this.minimumDate.slice(6,10)}-${this.minimumDate.slice(3,5)}-${this.minimumDate.slice(0,2)}` : '',
      readingTime: this.readingTime,
      authorName: this.authorName,
      gamesRating: this.gamesRating
    });

    /*switch(this.nameCategory){
      case 'video': this.videoApiService.searchVideo(this.maximumYear, this.typeVideo).subscribe(
        dataVideo => this.products = dataVideo,
        error => console.log("ERROR: data video don't got")
      ); break;
      
      case 'books': this.booksApiService.searchBooks({
        maximumYear: this.maximumYear,
        minimumYear: this.minimumYear,
        readingTime: this.readingTime,
        authorName: this.authorName
      }).subscribe(
        dataBooks => this.products = dataBooks,
        error => console.log("ERROR: data video don't got")
      ); break;

      default: 
    }*/
  }

  reset(){
    this.maximumDate = '';

    this.typeVideo = 'all';

    this.minimumDate = '';

    this.yearOfRelease = ''

    this.authorName = '';

    this.readingTime = '';

    this.gamesRating ='';

    this.resetItems.emit();
  }

}
