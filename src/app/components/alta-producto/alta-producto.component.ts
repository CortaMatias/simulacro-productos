import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/models/paises-interface';
import { Producto } from 'src/app/models/producto-interface';
import { ProductoService } from 'src/app/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent {
  producto!: Producto; 
  @Input() paisSeleccionado: Pais | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService 
  ) {}

  productoForm = this.formBuilder.group({
    codigo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    paisOrigen: ['', [Validators.required]],
    comestible: [false], 
  });

  paisSelect(pais : Pais){
    this.paisSeleccionado = pais;
    if(pais.nombre){
      this.productoForm.get('paisOrigen')?.setValue(pais.nombre);
    }  
  }

  guardarProducto() {
    if (this.productoForm.valid) {
      let data = {
        codigo: this.productoForm.value.codigo,
        descripcion: this.productoForm.value.descripcion,
        precio: this.productoForm.value.precio,
        stock: this.productoForm.value.stock,
        paisOrigen: JSON.stringify(this.paisSeleccionado),
        comestible: this.productoForm.value.comestible,
      };

      this.productoService
        .addProducto(data) 
        .then(() => {
          this.mostrarAlertaExito('Éxito', 'El producto ha sido agregado');
          this.productoForm.reset();
        })
        .catch((error : any) => {
          console.error('Error al guardar el producto', error);
        });
    } else {
      this.mostrarAlertaError('Error', 'Verifique los campos');
      this.mostrarAdvertencias();
    }
  }

  mostrarAdvertencias() {
    for (const control in this.productoForm.controls) {
      if (this.productoForm.controls.hasOwnProperty(control)) {
        this.productoForm.get(control)?.markAsTouched();
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
