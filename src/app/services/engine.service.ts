import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authorization } from '../interfaces/authorization';
import { Meals } from '../interfaces/meals';
import { InputError } from '../models/input-error';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  // private apiGetALL = 'http://127.0.0.1:3000/api/v1/meals';
  private apiGetALL = 'https://api.mealplannit.com/api/v1/meals';
  ingredientsList: Array<string> = [];
  isBrowseSection: boolean = false;
  generatedIngredients: Array<any> = new Array<any>();
  measurements = [
    'pound',
    'lb',
    'gram',
    'gallon',
    'cup',
    'ounce',
    'kilogram',
    'pint',
    'fl ounces',
    'teaspoon',
    'tablespoon',
    'spoon',
    'quarts',
  ];
  // ingredients?: any;
  constructor(private http: HttpClient) {}

  getIngredients(): Observable<any> {
    return this.http.get<any>('assets/ingredients.json');
  }

  getAllMeals(): Observable<Meals> {
    return this.http.get<Meals>(this.apiGetALL);
  }

  browseMeals(pageNumber: Number): Observable<Meals> {
    return this.http.get<Meals>(`${this.apiGetALL}/browse/${pageNumber}`);
  }

  createMeal(postData: any): Observable<any> {
    return this.http.post<any>(this.apiGetALL, postData);
  }

  grabMeal(postData: any): Observable<any>{
    return this.http.post<any>(`${this.apiGetALL}/getMeal/`,postData);
  }

  updateMeal(postData: any, mealId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiGetALL}/${mealId}`, postData);
  }
  deleteMeal(mealId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiGetALL}/${mealId}`);
  }
}
