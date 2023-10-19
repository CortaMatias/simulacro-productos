import { Component, EventEmitter, Output } from '@angular/core';
import { Pais } from 'src/app/models/paises-interface';
import { PaisesService } from 'src/app/servicios/paises.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss']
})
export class TablaPaisesComponent {

  paises : Pais[] = [];

@Output() eventPaisSeleccionado = new EventEmitter<Pais>();

  constructor(private paisesService : PaisesService){}
  async ngOnInit(){  
      this.paisesService.TraerPaises().then((respuesta)=>{
        console.log(respuesta);
        this.paises =  respuesta;
      });    
  }


  seleccionar(pais : Pais){
    this.eventPaisSeleccionado.emit(pais);
  }
}
