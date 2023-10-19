import { Pais } from "./paises-interface";

export interface Producto {
    id: string;
    codigo: string;
    descripcion: string;
    precio: number;
    stock: number;
    paisOrigen: Pais;
    comestible: boolean;
  }
  