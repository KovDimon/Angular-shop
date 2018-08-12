import { TestBed, inject } from '@angular/core/testing';

import { BooksApiService } from './books-api.service';

describe('BooksApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksApiService]
    });
  });

  it('should be created', inject([BooksApiService], (service: BooksApiService) => {
    expect(service).toBeTruthy();
  }));
});
