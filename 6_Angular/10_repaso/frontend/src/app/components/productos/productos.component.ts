import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];

  constructor(public _productosService: ProductosService) { }

  ngOnInit() {
    this._productosService.getProductos().subscribe( data => {
      this.productos = data;
    });
  }
}
