import { Component, Input } from '@angular/core';
import { Pais } from 'src/app/models/paises-interface';

@Component({
  selector: 'app-detalle-paises',
  templateUrl: './detalle-paises.component.html',
  styleUrls: ['./detalle-paises.component.scss']
})
export class DetallePaisesComponent {
  @Input() pais?: Pais;

  ngOnInit() {
    if(this.pais){
      console.log(this.pais);
    }

  }
}
