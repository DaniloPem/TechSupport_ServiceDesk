import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPage } from '../model/usuario-page';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/api/usuarios';

  constructor(private httpClient: HttpClient) {}

  getListUsuarios(
    filter: string = '',
    page: number = 0,
    pageSize: number = 30
  ): Observable<UsuarioPage> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.httpClient.get<UsuarioPage>(`${this.API}`, { params });
  }

  createUser(usuarioRecord: Partial<Usuario>): Observable<number> {
    return this.httpClient.post<number>(this.API, usuarioRecord);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.API}/${id}`);
  }
}
