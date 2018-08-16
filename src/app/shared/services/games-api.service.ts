import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
}) 
export class GamesApiService {

  private dataGames: Product[];

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'user-key': '63869f43b9232e2030b4274251f6d008'
  });

  constructor(private http: HttpClient) {}

  public getGame(str:string): Observable<any>{

    return this.http.get(`games_api/games/${str}?fields=*`,{
      headers: this.headers
    })
    .pipe(map(dataGame => { console.log('123', dataGame); return this.transformItem(dataGame); }));
  }

  public getNewGames(): Observable<any>{

    return this.http.get(`games_api/games/?fields=name,release_dates,cover,popularity&order=popularity:desc&limit=6`,{
      headers: this.headers
    })
    .pipe(map((dataGames: any[]) => {
      console.log('123'); 
      this.dataGames = this.transformItems(dataGames);
      return this.dataGames;
  }));
  }

  private transformItems(data: any[]){
    return data.map(obj => {
      let product = new Product;
      product.id = obj.id;
      product.type = 'game';
      product.title = obj.name;
      product.imageUrl = obj.cover ? 
      `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${obj.cover.cloudinary_id}.jpg` : obj.cover.url;
      product.description = obj.summary ? obj.summary : '';
      product.year = obj.release_dates[0].human.slice(0,4);
      product.trailer = obj.videos ? obj.videos[0].video_id : '';
      product.websites = obj.websites ? obj.websites : '';
      product.price = obj.total_rating ? Math.floor(obj.total_rating/4) : 0;
      product.rating = obj.total_rating ? obj.total_rating : 0;

      return product;
    });

  }

  private transformItem(obj: any){

      let product = new Product;
      product.id = obj.id;
      product.type = 'game';
      product.title = obj.name;
      product.imageUrl = obj.cover ? 
      `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${obj.cover.cloudinary_id}.jpg` : obj.cover.url;
      product.description = obj.summary ? obj.summary : '';
      product.year = obj.release_dates[0].human.slice(0,4);
      product.trailer = obj.videos ? obj.videos[0].video_id : '';
      product.websites = obj.websites ? obj.websites : '';
      product.price = obj.total_rating ? Math.floor(obj.total_rating/4) : 0;
      product.rating = obj.total_rating ? obj.total_rating : 0;

      return product;
  }


}
