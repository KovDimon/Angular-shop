import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  private dataBooks: Product[];

  constructor(private http: HttpClient) { }

  public getBook(str:string): Observable<any>{

    return this.http.get(`books_api/?isbn=${str}`)
    .pipe(map((dataBook) => {console.log('Book data received', dataBook); return this.transformItem(dataBook); }));
  }

  public getNewBooks(): Observable<any>{

    return this.http.get(`books_api/?publicationdategreaterthan=2018-01-01T00:00:00Z&publicationdatelessthan=2018-08-15T00:00:00Z`)
    .pipe(map((dataBooksObject: any) => {
      console.log('123'); 
      let dataBooks = dataBooksObject.Extracts; 
      dataBooks.length = 6;
      this.dataBooks=this.transformItems(dataBooks);
      return this.dataBooks;
    }));
  }

  private transformItems(data: any[]){
    return data.map(obj => {
      let product = new Product;

      product.id = obj.isbn;
      product.type = 'books';
      product.title = obj.title;
      product.imageUrl = obj.jacketUrl;
      product.textWithHTML = obj.extractHtml ? obj.extractHtml : '';
      product.year = obj.publicationDate ? obj.publicationDate.slice(0,4) : '';
      product.author = obj.author;
      product.authorBiography = obj.authorBiography;
      product.price = Math.ceil(Math.random() * 10);
      product.estimatedReadingTime = obj.estimatedReadingTimeMinutes ? obj.estimatedReadingTimeMinutes : 0;      

      return product;
    });
  }

  private transformItem(obj: any){

      let product = new Product;
      product.id = obj.isbn;
      product.type = 'books';
      product.title = obj.title;
      product.imageUrl = obj.jacketUrl;
      product.textWithHTML = obj.extractHtml ? obj.extractHtml : '';
      product.year = obj.publicationDate ? obj.publicationDate.slice(0,4) : '';
      product.author = obj.author;
      product.authorBiography = obj.authorBiography;
      product.price = Math.ceil(Math.random() * 10);
      product.estimatedReadingTime = obj.estimatedReadingTimeMinutes ? obj.estimatedReadingTimeMinutes : 0;      

      return product;
  }
}
