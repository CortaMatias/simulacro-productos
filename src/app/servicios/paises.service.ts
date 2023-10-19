import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../models/paises-interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private ruta = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  async TraerPaises(): Promise<Pais[]> {
    try {
      const respuesta: any = await this.http.get(this.ruta).toPromise();

      const americaLatina = respuesta.filter((element: any) => {
        return element.region === "Americas";
      });

      const paisesAmLatina = americaLatina.slice(0, 6).map((paisInfo: any) => {
        return {
          bandera: paisInfo.flags.png,
          nombre: paisInfo.name.common,
          informacion: paisInfo
        };
      });

      return paisesAmLatina;
    } catch (error) {
      console.error('Error al obtener los países', error);
      throw error;
    }
  }
}
