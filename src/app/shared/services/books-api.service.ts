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
    .pipe(map((dataBook: any) => {console.log('Book data received', dataBook); return this.transformItem(dataBook.Extracts[0]); }));
  }

  public getNewBooks(): Observable<any>{

    return this.http.get(`books_api/?publicationdategreaterthan=2018-01-01T00:00:00Z&publicationdatelessthan=2018-08-15T00:00:00Z`)
    .pipe(map((dataBooksObject: any) => {
      console.log(dataBooksObject); 
      let dataBooks = dataBooksObject.Extracts; 
      this.dataBooks=this.transformItems(dataBooks);
      return this.dataBooks;
    }));
  }

  public searchBooks(name: string, params?): Observable<any>{
    let minimumDate, maximumDate, authorName, readingTime, nameBook;
    nameBook = name ? `titlecontains=${name}`: '';
    if(params){
      minimumDate = params.minimumDate ? `&publicationdategreaterthan=${params.minimumDate}T00:00:00Z` : '';
      maximumDate = params.maximumDate ? `&publicationdatelessthan=${params.maximumDate}T00:00:00Z` : '';
      authorName = params.authorName ? `&authorcontains=${params.authorName}` : '';
      readingTime = params.readingTime ? `&readingtimelessthan=${params.readingTime}` : '';
    }else{
      minimumDate ='';
      maximumDate = '';
      authorName = '';
      readingTime = '';
    }
    /*
    param.minimumDate ? param.minimumDate = `publicationdategreaterthan=${param.minimumDate}T00:00:00Z` : '';
    param.maximumDate ? param.maximumDate = `publicationdatelessthan=${param.maximumDate}T00:00:00Z` : '';
    param.authorName ? param.authorName = `authorcontains=${param.authorName}` : '';
    param.readingTime ? param.readingTime = `readingtimelessthan=${param.readingTime}` : '';
    param.name ? param.name = `titlecontains==${param.name}` : '';*/

   

    return this.http.get(`books_api/?${nameBook}${minimumDate}${maximumDate}${authorName}${readingTime}`)
    .pipe(map((dataBooksObject: any) => {
      console.log('123'); 
      let dataBooks = dataBooksObject.Extracts;
      this.dataBooks = this.transformItems(dataBooks);
      console.log(this.dataBooks); 
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
      product.price = obj.isbn.slice(11,13)*5/10;
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
      product.price = obj.isbn.slice(11,13)*5/10;
      product.estimatedReadingTime = obj.estimatedReadingTimeMinutes ? obj.estimatedReadingTimeMinutes : 0;      

      return product;
  }
}
