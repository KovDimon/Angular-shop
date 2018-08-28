import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Categories } from '../../models/categories.model';

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

  private yearOfRelease: string = ''

  private authorName: string = '';

  private readingTime: string = '';

  private gamesRating : string ='';

  constructor() { }

  ngOnInit() {
  }
 
  changeParametrs(event){
    event.preventDefault();

    this.filterItems.emit({
      yearOfRelease: this.maximumDate.slice(6,10),
      typeVideo: this.typeVideo,
      maximumDate: this.maximumDate ? `${this.maximumDate.slice(6,10)}-${this.maximumDate.slice(3,5)}-${this.maximumDate.slice(0,2)}` : '',
      minimumDate: this.minimumDate ? `${this.minimumDate.slice(6,10)}-${this.minimumDate.slice(3,5)}-${this.minimumDate.slice(0,2)}` : '',
      readingTime: this.readingTime,
      authorName: this.authorName,
      gamesRating: this.gamesRating
    });
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
