import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  idPedido?: number;
  coste: number;
  direccion: string;
  metodoPago:string;
 
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/responsivemeals/pedidos'; // Ajusta el puerto si es necesario

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedido(idPedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${idPedido}`);
  }

  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  updatePedido(idPedido: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${idPedido}`, pedido);
  }

  deletePedido(idPedido: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPedido}`);
  }
}
