import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import Item from '../types/Items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private _HttpClient: HttpClient) { }
  
  getAll(): Observable<Item[]>{
    return this._HttpClient.get<Item[]>('https://localhost:44384/api/Items');
  }
  getById(id:string): Observable<Item>{
    return this._HttpClient.get<Item>(`https://localhost:44384/api/Items/${id}`);
  }

  addItem(item: object): Observable<Item>{
    return this._HttpClient.post<Item>("https://localhost:44384/api/Items",item);
  }
  
  updateItem(id:string): Observable<Item>{
    return this._HttpClient.get<Item>(`https://localhost:44384/api/Items/${id}`);
  }

  deleteItem(id:number): Observable<void>{
    return this._HttpClient.delete<void>(`https://localhost:44384/api/Items/${id}`);
  }
}
