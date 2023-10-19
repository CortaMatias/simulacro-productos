import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Producto } from '../models/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore : Firestore){}
  async addProducto(producto: any): Promise<boolean> {
    try {
      await addDoc(collection(this.firestore, 'Productos'), producto);
      console.log('Producto agregado con éxito');
      return true;
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
      return false;
    }
  }


  getProductos(): Observable<Producto[]> {
    const productosRef = collection(this.firestore, 'Productos');
    return from(getDocs(productosRef)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const producto: Producto = {
            id: doc.id,
            codigo: data['codigo'],
            descripcion: data['descripcion'],
            precio: data['precio'],
            stock: data['stock'],
            paisOrigen: JSON.parse(data['paisOrigen']),
            comestible: data['comestible']
          };
          return producto;
        });
      })
    );
  }
}
