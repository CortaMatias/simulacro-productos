import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Container } from 'src/app/models/container-interface';
import { ContainerService } from 'src/app/servicios/container.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-container',
  templateUrl: './alta-container.component.html',
  styleUrls: ['./alta-container.component.scss'],
})
export class AltaContainerComponent {
  container!: Container;
  @Output() containerCreated = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private containerService: ContainerService
  ) {}

  containerForm = this.formBuilder.group({
    codigo: ['', [Validators.required]],
    color: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    capacidad: ['', [Validators.required]],
  });

  guardarContenedor() {
    if (this.containerForm.valid) {
      let data = {
        codigo: this.containerForm.value.codigo,
        color: this.containerForm.value.color,
        empresa: this.containerForm.value.empresa,
        capacidad: this.containerForm.value.capacidad,
      };

      this.containerService
        .addContainer(data)
        .then(() => {
          this.mostrarAlertaExito('Éxito', 'El contenedor ha sido agregado');
          this.containerCreated.emit(data);
          this.containerForm.reset();
        })
        .catch((error: any) => {
          console.error('Error al guardar el contenedor', error);
        });
    } else {
      this.mostrarAlertaError('Error', 'Verifique los campos');
      this.mostrarAdvertencias();
    }
  }

  mostrarAdvertencias() {
    for (const control in this.containerForm.controls) {
      if (this.containerForm.controls.hasOwnProperty(control)) {
        this.containerForm.get(control)?.markAsTouched();
      }
    }
  }

  mostrarAlertaExito(titulo: string, mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  mostrarAlertaError(titulo: string, mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      timer: 4000,
    });
  }
}
