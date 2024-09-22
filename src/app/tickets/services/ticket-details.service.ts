import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AtributoDto {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class TicketDetailsService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {}

  getCategoria(nomeCategoria: string): Observable<AtributoDto[]> {
    return this.httpClient.get<AtributoDto[]>(
      `${this.API}/categorias/por-nome?nome=${nomeCategoria}`
    );
  }

  getTag(idCategoria: number): Observable<AtributoDto[]> {
    return this.httpClient.get<AtributoDto[]>(
      `${this.API}/tags/por-categoria/${idCategoria}`
    );
  }
}
