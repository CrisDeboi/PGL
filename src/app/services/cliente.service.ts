import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  idCliente?: number;
  nombre: string;
  suscripcion: string;
  email:string;
  contrasena:string;
  telefono:string;
  fechaRegistro:Date;  
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/responsivemeals/clientes'; // Ajusta el puerto si es necesario

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${idCliente}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(idCliente: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${idCliente}`, cliente);
  }

  deleteCliente(idCliente: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idCliente}`);
  }
}
