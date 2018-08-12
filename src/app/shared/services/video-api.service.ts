import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class VideoApiService {

  private videoUrl: string = 'http://www.omdbapi.com/?apikey=1a8fdd0&';

  constructor(private http: HttpClient) {}

  public getVideo(str:string): Observable<any>{
    return this.http.get(`${this.videoUrl}i=${str}`)
    .pipe(tap(dataVideo => console.log('Video data ')));
  }

  public searchVideo(str:string): Observable<any>{
    return this.http.get(`${this.videoUrl}${str}`)
    .pipe(tap(data => console.log('Search data ')));
  }

}
