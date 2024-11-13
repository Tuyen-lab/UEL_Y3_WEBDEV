import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExampleService {

api: string='http://localhost:3000'
  constructor( private _http: HttpClient) { }

  
  handleError( err: HttpErrorResponse){
    return throwError(() => new Error(err.message));
  }
  getSP(): Observable<any> {
    return this._http.get<any>(`${this.api}/product`).pipe(
      retry(2),
      catchError(this.handleError))
  }
  getrental(): Observable<any> {
    return this._http.get<any>(`${this.api}/rented`).pipe(
      retry(2),
      catchError(this.handleError))
  }
  addSP(product: { name: string; price: number }): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>( `${this.api}/product`,product, { headers }).pipe(
      catchError(this.handleError))
  }
  addrental(
    rental: { manha: string,
      gia: string,
      host: string,
      ngaythue: string,
      ngaytra:  string,
      detail: any }): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>( `${this.api}/rented`,rental, { headers}).pipe(
      catchError(this.handleError))
  }
  deleteBeer(id: string): Observable<any> {
    
    const url = `${this.api}/${id}`;
    console.log(url)
    return this._http.delete(url);
  }
  updatePartialBeer(id: string, updateData: Partial<{ name: string; price: number }>): Observable<any> {
    const url = `${this.api}/${id}`; // Tạo endpoint cho yêu cầu PATCH
  
    return this._http.patch(url, updateData); 
  }

}
