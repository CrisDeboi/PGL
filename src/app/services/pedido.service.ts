import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Cliente {
  idCliente: number;
}

export interface Pedido {
  id_pedido?: number;
  cliente:Cliente,
  coste_total: number;
  direccion: string;
  metodo_pago:string;
 
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

  getPedidosCliente(idCliente: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/cliente/${idCliente}`);
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
