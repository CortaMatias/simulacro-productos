import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Container } from 'src/app/models/container-interface';
import { ContainerService } from 'src/app/servicios/container.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-container',
  templateUrl: './modificar-container.component.html',
  styleUrls: ['./modificar-container.component.scss'],
})
export class ModificarContainerComponent {
  @Input() containerSeleccionado!: Container;
  @Output() containerModificado: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  containerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private containerService: ContainerService
  ) {}

  ngOnInit() {
    this.containerForm = this.formBuilder.group({
      color: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      capacidad: ['', [Validators.required, Validators.min(0)]],
    });
  }

  modificarContainer() {
    if (this.containerForm.valid) {
      const containerActualizado: Container = {
        codigo: this.containerSeleccionado.codigo,
        color: this.containerForm.value.color,
        empresa: this.containerForm.value.empresa,
        capacidad: this.containerForm.value.capacidad,
        id: this.containerSeleccionado.id,
      };

      this.containerService
        .actualizarContainerBD(containerActualizado)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Modificación de contenedor exitosa',
            text: 'Contenedor modificado',
            timer: 1500,
            showConfirmButton: false,
          });
          this.containerModificado.emit(true);
          this.containerForm.reset();
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al modificar el contenedor',
            text: error.message,
            timer: 4000,
          });
          this.containerModificado.emit(false);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error, complete los datos correctamente',
        timer: 2500,
      });
    }
  }
}
