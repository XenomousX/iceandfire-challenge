import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'https://anapioficeandfire.com/api';
  constructor(private http: HttpClient) {}

  getBooks(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/books?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getBookById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/books?name=${query}`);
  }

  getHouses(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/houses?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getHouseById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchHouses(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/houses?name=${query}`);
  }

  getCharacters(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/characters?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getCharacterById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchCharacters(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters?name=${query}`);
  }
}
