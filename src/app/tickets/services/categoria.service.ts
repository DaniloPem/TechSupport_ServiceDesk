import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriasPage } from '../model/categorias-page';

export interface AtributoDto {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly API = 'http://localhost:8080/api/categorias';

  constructor(private httpClient: HttpClient) {}

  getListCategorias(
    filter: string = '',
    page: number = 0,
    pageSize: number = 30
  ): Observable<CategoriasPage> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.httpClient.get<CategoriasPage>(`${this.API}`, { params });
  }

  getListCategoriasPorIds(ids: number[]): Observable<AtributoDto[]> {
    return this.httpClient.get<AtributoDto[]>(`${this.API}/${ids}`);
  }
}
