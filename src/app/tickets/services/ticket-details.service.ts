import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TicketDetailsService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getCategoria(nomeCategoria: string) {
    return this.httpClient.get(
      `${this.API}/categorias/por-nome/${nomeCategoria}?limit=5`
    );
  }
}
