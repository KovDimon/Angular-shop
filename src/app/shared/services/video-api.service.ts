import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
}) 
export class VideoApiService {

  private dataVideos: Product[];

  private dataVideo: Product;

  private date = new Date();

  constructor(private http: HttpClient) {}

  public getVideo(str:string): Observable<any>{
    return this.http.get(`movies_api/?apikey=1a8fdd0&i=${str}`)
    .pipe(map(dataVideo => {console.log('Video data received'); return this.transformItem(dataVideo); }));
  }

  public getNewVideo(): Observable<any>{

    return this.http.get(`movies_api/?apikey=1a8fdd0&s=new&y=${this.date.getFullYear()}`)
    .pipe(map((dataVideoObject: any) => {
      console.log('123'); 
      console.log(dataVideoObject);

      let dataVideo = dataVideoObject.Search;
      this.dataVideos = this.transformItems(dataVideo);
       
      return this.dataVideos;
    }));
  }

  public searchVideo(name: string, params?): Observable<any>{
    let year, type;

    if(params){
      year = params.yearOfRelease;
      params.typeVideo =='all' ? type = '' : type = params.typeVideo;
    }else{
      year ='';
      type='';
    }
    console.log(name, year, type);
    return this.http.get(`movies_api/?apikey=1a8fdd0&s=${name}&y=${year}&type=${type}`)
    .pipe(map((dataVideoObject: any) => {
      console.log(dataVideoObject); 
      if(dataVideoObject.Response == 'True'){
        let dataVideo = dataVideoObject.Search;
        this.dataVideos = this.transformItems(dataVideo);
      }else{
        this.dataVideos = [];
      }
      
      return this.dataVideos;
    }));
  }

  private transformItems(data: any[]){
    return data.map(obj => {
      let product = new Product;
      product.id = obj.imdbID;
      product.type = 'video';
      product.title = obj.Title;
      product.imageUrl = obj.Poster != 'N/A' ?  obj.Poster : '';
      product.description = obj.Plot != 'N/A' ? obj.Plot : '';
      product.year = obj.Year.slice(0,4);
      product.typeVideo = obj.Type;
      product.actors = obj.Actors != 'N/A' ? obj.Actors : '';
      product.price = obj.imdbRating != 'N/A' ? Math.floor(obj.imdbRating*5) : obj.imdbID.slice(7,9)*5/10;
      product.rating = obj.imdbRating != 'N/A' ? obj.imdbRating : 0;
      product.runtime = obj.Runtime != 'N/A' ? obj.Runtime : '0';
      product.language = obj.Language != 'N/A' ? obj.Language : '';
      product.country = obj.Country != 'N/A' ? obj.Country : '';
      product.genre = obj.Genre  != 'N/A' ? obj.Genre : '';
      product.writers = obj.Writer != 'N/A' ? obj.Writer : '';

      return product;
    });

  }

  private transformItem(obj: any){

      let product = new Product;
      product.id = obj.imdbID;
      product.type = 'video';
      product.title = obj.Title;
      product.imageUrl = obj.Poster != 'N/A' ?  obj.Poster : '';
      product.description = obj.Plot != 'N/A' ? obj.Plot : '';
      product.year = obj.Year.slice(0,4);
      product.typeVideo = obj.Type;
      product.actors = obj.Actors != 'N/A' ? obj.Actors : '';
      product.price = obj.imdbRating != 'N/A' ? Math.floor(obj.imdbRating*5) : obj.imdbID.slice(7,9)*5/10;
      product.rating = obj.imdbRating != 'N/A' ? obj.imdbRating : 0;
      product.runtime = obj.Runtime != 'N/A' ? obj.Runtime : '0';
      product.language = obj.Language != 'N/A' ? obj.Language : '';
      product.country = obj.Country != 'N/A' ? obj.Country : '';
      product.genre = obj.Genre != 'N/A' ? obj.Genre : '';
      product.writers = obj.Writer != 'N/A' ? obj.Writer : '';

      return product;
  }

  /*public searchVideo(): Observable<any>{
    return this.http.get(`movies_api/?apikey=1a8fdd0&s=new&y=2018`)
    .pipe(tap(dataVideo => console.log('Video data received')));
  }*/
}
