import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from 'rxjs';

export interface CategoryResponse {
  count: number
  categories: Array<string>
}

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  getListCatagory(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`https://api.publicapis.org/categories`).pipe(map(response => {
      return response
    }))
  }
}
