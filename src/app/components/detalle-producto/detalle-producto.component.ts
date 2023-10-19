import { Component } from '@angular/core';
import { Pais } from 'src/app/models/paises-interface';
import { Producto } from 'src/app/models/producto-interface';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {
  productoSeleccionado! : Producto ;
  paisSeleccionado! : Pais;

  ngOnInit(){
    
  }

  getProductoSeleccionado(producto : Producto){
    this.productoSeleccionado = producto;
     this.paisSeleccionado = producto.paisOrigen;

  }
}
