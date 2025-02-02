import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GruposTecnicosPage } from '../model/grupos-tecnicos-page';
import { DadosVisualizacaoGrupoTecnico } from '../model/dadosVisualizacaoGrupoTecnico';
import { GrupoTecnicoCadastro } from '../model/grupo-tecnico-cadastro';

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

  getGruposTecnicosPorIds(ids: number[]): Observable<AtributoDto[]> {
    return this.httpClient.get<AtributoDto[]>(`${this.API}/${ids}`);
  }

  getGrupoTecnico(id: number): Observable<DadosVisualizacaoGrupoTecnico> {
    return this.httpClient.get<DadosVisualizacaoGrupoTecnico>(
      `${this.API}/management/${id}`
    );
  }

  createTechnicalGroup(
    grupoTecnicoRecord: Partial<GrupoTecnicoCadastro>
  ): Observable<number> {
    return this.httpClient.post<number>(`${this.API}`, grupoTecnicoRecord);
  }

  editGrupoTecnico(
    grupoTecnicoRecord: Partial<DadosVisualizacaoGrupoTecnico>
  ): Observable<number> {
    return this.httpClient.put<number>(
      `${this.API}/${grupoTecnicoRecord.id}`,
      grupoTecnicoRecord
    );
  }

  disableTechnicalGroup(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }
}
