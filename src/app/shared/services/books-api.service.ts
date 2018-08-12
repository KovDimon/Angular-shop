import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  private gamesUrl: string = 'https://api.itbook.store/1.0/new';

  constructor(private http: HttpClient) { }

  public getBooks(str:string): Observable<any>{

    return this.http.get(`${this.gamesUrl}`, {
      headers: this.headers
    })
    .pipe(tap((dataVideo) => console.log('Games data ')));
  }
}
