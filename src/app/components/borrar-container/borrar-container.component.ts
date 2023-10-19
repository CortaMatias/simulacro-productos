import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Container } from 'src/app/models/container-interface';
import { ContainerService } from 'src/app/servicios/container.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-container',
  templateUrl: './borrar-container.component.html',
  styleUrls: ['./borrar-container.component.scss']
})
export class BorrarContainerComponent {
  @Input() containerSeleccionado!: Container;
  @Output() containerBorrado: EventEmitter<boolean> = new EventEmitter<boolean>;

  constructor(private containerService: ContainerService) {}

  async confirmarBorrarContainer() {
    const result = await Swal.fire({
      title: `¿Estás seguro de que deseas eliminar el contenedor con código ${this.containerSeleccionado.codigo}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      if (this.containerSeleccionado && this.containerSeleccionado.id) {
        const exitoBorrado = await this.containerService.borrarContainerBD(this.containerSeleccionado.id);
        this.containerBorrado.emit(exitoBorrado);
      } else {
        console.error('ID del contenedor no definido');
      }
    }
  }
}
