import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  gotURL: string = 'https://anapioficeandfire.com/api';
  apiUrl: string = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  getBooks(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.gotURL}/books?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getBookById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchBooks(query: string): Observable<any> {
    return this.http.get(`${this.gotURL}/books?name=${query}`);
  }

  getHouses(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.gotURL}/houses?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getHouseById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchHouses(query: string): Observable<any> {
    return this.http.get(`${this.gotURL}/houses?name=${query}`);
  }

  getCharacters(page?: Number, pageSize?: Number): Observable<any> {
    return this.http.get(
      `${this.gotURL}/characters?page=${page || 1}&pageSize=${pageSize || 10}`
    );
  }

  getCharacterById(url: string): Observable<any> {
    return this.http.get(url);
  }

  searchCharacters(query: string): Observable<any> {
    return this.http.get(`${this.gotURL}/characters?name=${query}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, userData);
  }

  /** Protected Routes for Favorite */
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/profile`, {
      headers: { 'X-Requires-Auth': 'true' },
    });
  }

  createFavorite(favoriteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, favoriteData, {
      headers: { 'X-Requires-Auth': 'true' },
    });
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`, {
      headers: { 'X-Requires-Auth': 'true' },
    });
  }

  deleteFavorite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${id}`, {
      headers: { 'X-Requires-Auth': 'true' },
    });
  }

  updateFavorite(id: string, favoriteData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/favorites/${id}`, favoriteData, {
      headers: { 'X-Requires-Auth': 'true' },
    });
  }
}
