import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto-interface';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.scss']
})
export class TablaProductoComponent {
  @Output() productoSeleccionado = new EventEmitter<Producto>();
  productos! : Producto[] ;
  

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.getProductos();
  
  }

  async getProductos(){
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });
  }
  
  seleccionarProducto(producto: Producto) {
    this.productoSeleccionado.emit(producto);
  }
}
