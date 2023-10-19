import { Component, Input } from '@angular/core';
import { Pais } from 'src/app/models/paises-interface';
import { Producto } from 'src/app/models/producto-interface';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.scss']
})
export class InfoProductoComponent {
  @Input() producto?: Producto;

  ngOnInit(){
   console.log(this.producto)
  }
}
