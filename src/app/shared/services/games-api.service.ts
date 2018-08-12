import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class GamesApiService {

  private gamesUrl: string = 'https://api-2445582011268.apicast.io/franchises/';

  private headers = new HttpHeaders({
    'accept': 'application/json',
    'user-key': '63869f43b9232e2030b4274251f6d008'
  });

  constructor(private http: HttpClient) {}

  public getGames(str:string): Observable<any>{

    return this.http.get(`${this.gamesUrl}`,{
      headers: this.headers
    })
    .pipe(tap((dataVideo) => console.log('Games data ')));
  }

  public postGames(){
    return this.http.post('https://api-endpoint.igdb.com/headers/',{
      "api_header": {
        "header": "Access-Control-Allow-Origin",
        "value": "*"
    }
    });
  }
}
