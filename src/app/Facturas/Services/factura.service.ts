import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class FacturaService {
 
  private baseUrl = 'https://localhost:44386/api/Facturas';
 
  constructor(private http: HttpClient) { }
 
  getFactura(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  revisarFacturas(): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/revisar`,null);
  }
 
  updateFactura(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  getFacturasList(): Observable<any> {
      debugger;
    return this.http.get(`${this.baseUrl}`);
  }
}