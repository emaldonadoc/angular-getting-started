import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

 private readonly apiURL:string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  fetchProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL + '/products', this.httpOptions)
  }

  private handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(()=> errorMessage);
 }
}
