import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaDto {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketDetailsService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getCategoria(nomeCategoria: string): Observable<CategoriaDto[]> {
    return this.httpClient.get<CategoriaDto[]>(
      `${this.API}/categorias/por-nome?nome=${nomeCategoria}`
    );
  }
}
