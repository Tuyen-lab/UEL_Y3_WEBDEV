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
  getuser(): Observable<any> {
    return this._http.get<any>(`${this.api}/user`).pipe(
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
  adduser(user: { username: string; pass: string; phone:string; email: string }): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>( `${this.api}/user`,user, { headers }).pipe(
      catchError(this.handleError))
  }
  addrental(
    rental: { manha: string,
      gia: string,
      host: string,
      cus:string,
      ngaythue: string,
      ngaytra:  string,
      detail: any }): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post<any>( `${this.api}/rented`,rental, { headers}).pipe(
      catchError(this.handleError))
  }
  deleteSP(id: string): Observable<any> {
    
    const url = `${this.api}/${id}`;
    console.log(url)
    return this._http.delete(url);
  }
  deleteRented(id: string): Observable<any> {
    
    const url = `${this.api}/rented/${id}`;
    console.log(url)
    return this._http.delete(url);
  }
  updatePartialBeer(id: string, updateData: Partial<{ name: string; price: number }>): Observable<any> {
    const url = `${this.api}/${id}`; // Tạo endpoint cho yêu cầu PATCH
  
    return this._http.patch(url, updateData); 
  }

  logout(): void {
    localStorage.removeItem('user'); // Xóa token khỏi localStorage để đăng xuất
  }

  // Phương thức kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Kiểm tra token để xác định đăng nhập
    
  }
}
