import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagPage } from '../model/tag-page';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private readonly API = 'http://localhost:8080/api/tags';

  constructor(private httpClient: HttpClient) {}

  getListTags(
    filter: string = '',
    page: number = 0,
    pageSize: number = 30
  ): Observable<TagPage> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page)
      .set('pageSize', pageSize);
    return this.httpClient.get<TagPage>(`${this.API}`, { params });
  }
}
