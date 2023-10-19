import { Injectable } from '@angular/core';

import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Container } from '../models/container-interface';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private firestore: Firestore) { }

  async addContainer(container: any) {
    return addDoc(collection(this.firestore, 'Containers'), container);
  }

  getContainers(): Observable<Container[]> {
    const containersRef = collection(this.firestore, 'Containers');
    return from(getDocs(containersRef)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const container: Container = {
            id: doc.id,
            codigo: data['codigo'],
            color: data['color'],
            empresa: data['empresa'],
            capacidad: data['capacidad']
          };
          return container;
        });
      })
    );
  }

  public async actualizarContainerBD(container: Container): Promise<boolean> {
    try {
      const containersCollection = collection(this.firestore, 'Containers');

      const containerData = {
        codigo: container.codigo,
        color: container.color,
        empresa: container.empresa,
        capacidad: container.capacidad,
      };
      await updateDoc(doc(containersCollection, container.id), containerData);
      console.log('Contenedor actualizado con ID: ', container.id);
      return true;
    } catch (error) {
      console.error('Error al actualizar el contenedor: ', error);
      return false;
    }
  }

  public async borrarContainerBD(containerId: string): Promise<boolean> {
    try {
      const containersCollection = collection(this.firestore, 'Containers');

      await deleteDoc(doc(containersCollection, containerId));

      console.log('Contenedor eliminado con ID: ', containerId);
      return true;
    } catch (error) {
      console.error('Error al eliminar el contenedor: ', error);
      return false;
    }
  }
}
