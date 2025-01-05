import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GruposTecnicosPage } from '../model/grupos-tecnicos-page';

export interface AtributoDto {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class GruposTecnicosService {
  private readonly API = 'http://localhost:8080/api/gruposAssignados';

  constructor(private httpClient: HttpClient) {}

  getListGruposTecnicos(
    filter: string = '',
    page: number = 0,
    pageSize: number = 30
  ): Observable<GruposTecnicosPage> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.httpClient.get<GruposTecnicosPage>(`${this.API}`, { params });
  }

  getGruposTecnicosPorNome(nomeGrupo: string): Observable<AtributoDto[]> {
    return this.httpClient.get<AtributoDto[]>(
      `${this.API}/por-nome?nome=${nomeGrupo}`
    );
  }
}
