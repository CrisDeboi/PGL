import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plato {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  rotacion: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl = 'http://localhost:8080/responsivemeals/comidas'; // Ajusta el puerto si es necesario

  constructor(private http: HttpClient) { }

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  addPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato);
  }

  updatePlato(id: number, plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${id}`, plato);
  }

  deletePlato(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
