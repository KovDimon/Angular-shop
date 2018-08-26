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
    .pipe(map(dataGame => { console.log('123', dataGame); return this.transformItem(dataGame[0]); }));
  }

  public getNewGames(): Observable<any>{

    return this.http.get(`games_api/games/?fields=name,release_dates,cover,rating&order=popularity:desc&limit=10`,{
      headers: this.headers
    })
    .pipe(map((dataGames: any[]) => {
      console.log('123'); 
      this.dataGames = this.transformItems(dataGames);
      return this.dataGames;
  }));
  }

  searchGames(name: string, params?): Observable<any>{
    let minimumDate,maximumDate, rating, nameGame;
    nameGame = name ? `search=${name}`: '';
    console.log(params);
    if(params){
      maximumDate = params.maximumDate ? `&filter[release_dates.date][eq]=${params.maximumDate}` : '';
      rating = params.gamesRating ? `&filter[rating][gte]=${params.gamesRating*10}`: '';
    }else{
      maximumDate = '';
      minimumDate = '';
      rating = '';
    }
    //name,release_dates,cover,rating
    return this.http.get(`games_api/games/?${nameGame}&fields=name,release_dates,cover,rating${rating}${maximumDate}`,{
      headers: this.headers
    })
    .pipe(map((dataGames: any[]) => {
      console.log(dataGames); 
      this.dataGames = this.transformItems(dataGames);
      return this.dataGames;
  }));
  }

  private transformItems(data: any[]){
    return data.map(obj => {
      let product = new Product;
      product.id = String(obj.id);
      product.type = 'games';
      product.title = obj.name;
      product.imageUrl = obj.cover ? 
      `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${obj.cover.cloudinary_id}.jpg` : '';
      product.description = obj.summary ? obj.summary : '';
      product.year = obj.release_dates ? obj.release_dates[0].human.slice(0,4) : '';
      product.trailer = obj.videos ? `https://www.youtube.com/watch?v=${obj.videos[0].video_id}` : '';
      product.websites = obj.websites ? obj.websites : '';
      product.price = obj.total_rating ? Math.floor(obj.total_rating/4) : Number(product.id.slice(0,3))* 5/10;
      product.rating = obj.total_rating ? obj.total_rating : 0;

      return product;
    });

  }

  private transformItem(obj: any){


      console.log(obj);
      let product = new Product;
      product.id = String(obj.id);
      product.type = 'games';
      product.title = obj.name;
      product.imageUrl = obj.cover ? 
      `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${obj.cover.cloudinary_id}.jpg` : '';
      product.description = obj.summary ? obj.summary : '';
      product.year = obj.release_dates ? obj.release_dates[0].human.slice(0,4) : '';
      product.trailer = obj.videos ? `https://www.youtube.com/watch?v=${obj.videos[0].video_id}` : '';
      product.websites = obj.websites ? obj.websites.map(obj => {
        //let text = obj.url.slice(8);
        let text = obj.url.match(/(\w+):\/\/([\w.]+)|(([\w.]+)-([\w.]+))\/(\S*)/);
        console.log(text);
        return { name: text[2], url: obj.url };
      }) : '';
      product.price = obj.total_rating ? Math.floor(obj.total_rating/4) : Number(product.id.slice(0,3))* 5/10;
      product.rating = obj.total_rating ? obj.total_rating/10 : 0;
      console.log(Number(product.id.slice(0,3))* 5/10);
      return product;
  }


}
