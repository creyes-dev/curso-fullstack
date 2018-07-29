import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlServicio: string;

  constructor(private http: HttpClient) {
    this.urlServicio = 'http://localhost:3000/';
  }

  getProductos() {
    return this.http.get<Producto[]>(this.urlServicio + 'productos');
  }

}
