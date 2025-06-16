import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {
  Observable,
  BehaviorSubject,
  switchMap,
  scan,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: false,
})
export class DetailComponent implements OnInit {
  private booksCurrentPage = new BehaviorSubject<number>(1);
  booksPageSize: number = 10;
  private charactersCurrentPage = new BehaviorSubject<number>(1);
  charactersPageSize: number = 10;
  private housesCurrentPage = new BehaviorSubject<number>(1);
  housesPageSize: number = 10;

  searchBook$ = new BehaviorSubject<string>('');
  searchHouse$ = new BehaviorSubject<string>('');
  searchCharacter$ = new BehaviorSubject<string>('');

  bookSerach: string = '';
  houseSerach: string = '';
  characterSerach: string = '';

  detailCharacter: any;
  detailHouse: any;
  detailBook: any;

  isModalOpen: boolean = false;
  modalDetail: any = {
    type: '',
    modalTitle: '',
  };

  // books$: Observable<any>;
  characters: any[] = [];
  houses: any[] = [];

  books$: Observable<any> = this.booksCurrentPage.pipe(
    switchMap((page) => this.apiService.getBooks(page, this.booksPageSize)),
    scan((acc, curr) => [...acc, ...curr])
  );

  characters$: Observable<any> = this.charactersCurrentPage.pipe(
    switchMap((page) =>
      this.apiService.getCharacters(page, this.charactersPageSize)
    ),
    scan((acc, curr) => [...acc, ...curr])
  );

  houses$: Observable<any> = this.housesCurrentPage.pipe(
    switchMap((page) => this.apiService.getHouses(page, this.housesPageSize)),
    scan((acc, curr) => [...acc, ...curr])
  );

  constructor(private apiService: ApiService) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    this.initFetchData();
    this.searchBook$
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.apiService.searchBooks(searchText).subscribe((data: any) => {
          if (data.length > 0) {
            this.books$ = new Observable((observer) => {
              observer.next(data);
              observer.complete();
            });
          } else {
            this.booksCurrentPage.next(1);
          }
        });
      });

    this.searchHouse$
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.apiService.searchHouses(searchText).subscribe((data: any) => {
          if (data.length > 0) {
            this.houses$ = new Observable((observer) => {
              observer.next(data);
              observer.complete();
            });
          } else {
            this.housesCurrentPage.next(1);
          }
        });
      });
    this.searchCharacter$
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((searchText: string) => {
        this.apiService.searchCharacters(searchText).subscribe((data: any) => {
          if (data.length > 0) {
            this.characters$ = new Observable((observer) => {
              observer.next(data);
              observer.complete();
            });
          } else {
            this.charactersCurrentPage.next(1);
          }
        });
      });
  }

  onSearchBooks(): void {
    this.searchBook$.next(this.bookSerach);
  }

  onSearchHouses(): void {
    this.searchHouse$.next(this.houseSerach);
  }

  onSearchCharacters(): void {
    this.searchCharacter$.next(this.characterSerach);
  }

  loadMoreBooks(): void {
    this.booksCurrentPage.next(this.booksCurrentPage.value + 1);
  }

  loadMoreCharacters(): void {
    this.charactersCurrentPage.next(this.charactersCurrentPage.value + 1);
  }

  loadMoreHouses(): void {
    this.housesCurrentPage.next(this.housesCurrentPage.value + 1);
  }

  private initFetchData(): void {
    this.booksCurrentPage.next(1);
    this.charactersCurrentPage.next(1);
    this.housesCurrentPage.next(1);
  }

  openModal(type: string, url: string): void {
    if (type === 'book') {
      this.apiService.getBookById(url).subscribe((data) => {
        this.detailBook = data;
        this.modalDetail = {
          type: 'book',
          modalTitle: `Book: ${this.detailBook.name}`,
        };
        console.log(this.detailBook);
        this.isModalOpen = true;
      });
    } else if (type === 'house') {
      this.apiService.getHouseById(url).subscribe((data) => {
        this.detailHouse = data;
        this.modalDetail = {
          type: 'house',
          modalTitle: `House: ${this.detailHouse.name}`,
        };
        this.isModalOpen = true;
      });
    } else if (type === 'character') {
      this.apiService.getCharacterById(url).subscribe((data) => {
        this.detailCharacter = data;
        this.modalDetail = {
          type: 'character',
          modalTitle: `Character: ${this.detailCharacter.name}`,
        };
        this.isModalOpen = true;
      });
    }
  }

  handleCancel(): void {
    this.isModalOpen = false;
    this.detailCharacter = null;
    this.detailHouse = null;
    this.detailBook = null;
  }
}
