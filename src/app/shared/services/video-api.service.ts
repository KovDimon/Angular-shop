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
      this.dataVideos = this.dataVideos.filter(obj => obj.imageUrl !== 'N/A');
       
      return this.dataVideos;
    }));
  }

  public searchVideo(name: string = 'new',year: string = `${this.date.getFullYear()}`, type: string = ''): Observable<any>{

    return this.http.get(`movies_api/?apikey=1a8fdd0&s=${name}&y=${year}&type=${type}`)
    .pipe(map((dataVideoObject: any) => {
      console.log('123'); 
      let dataVideo = dataVideoObject.Search;
      this.dataVideos = this.transformItems(dataVideo);
      this.dataVideos = this.dataVideos.filter(obj => obj.imageUrl !== 'N/A');
      console.log(this.dataVideos); 
      return this.dataVideos;
    }));
  }

  private transformItems(data: any[]){
    return data.map(obj => {
      let product = new Product;
      product.id = obj.imdbID;
      product.type = 'video';
      product.title = obj.Title;
      product.imageUrl = obj.Poster;
      product.description = obj.Plot ? obj.Plot : '';
      product.year = obj.Year.slice(0,4);
      product.typeVideo = obj.Type;
      product.actors = obj.Actors ? obj.Actors : '';
      product.price = obj.imdbRating ? Math.floor(obj.imdbRating*5) : 0;
      product.rating = obj.imdbRating ? obj.imdbRating : 0;
      product.runtime = obj.Runtime ? obj.Runtime : '0';
      product.language = obj.Language ? obj.Language : '';
      product.country = obj.Country ? obj.Country : '';
      product.genre = obj.Genre ? obj.Genre : '';
      product.writers = obj.Writer ? obj.Writer : '';

      return product;
    });

  }

  private transformItem(obj: any){

      let product = new Product;
      product.id = obj.imdbID;
      product.type = 'video';
      product.title = obj.Title;
      product.imageUrl = obj.Poster;
      product.description = obj.Plot ? obj.Plot : '';
      product.year = obj.Year.slice(0,4);
      product.typeVideo = obj.Type;
      product.actors = obj.Actors ? obj.Actors : '';
      product.price = obj.imdbRating ? Math.floor(obj.imdbRating*5) : 0;
      product.rating = obj.imdbRating ? obj.imdbRating : 0;
      product.runtime = obj.Runtime ? obj.Runtime : '0';
      product.language = obj.Language ? obj.Language : '';
      product.country = obj.Country ? obj.Country : '';
      product.genre = obj.Genre ? obj.Genre : '';
      product.writers = obj.Writer ? obj.Writer : '';

      return product;
  }

  /*public searchVideo(): Observable<any>{
    return this.http.get(`movies_api/?apikey=1a8fdd0&s=new&y=2018`)
    .pipe(tap(dataVideo => console.log('Video data received')));
  }*/
}
