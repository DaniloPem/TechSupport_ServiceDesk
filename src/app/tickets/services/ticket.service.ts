import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Ticket } from '../model/ticket';
import { DadosVisualizacaoTicketById } from '../model/dadosVisualizacaoTicket';
import { DadosVisualizacaoTicketPorTipo } from '../model/dadosVisualizacaoTabelaPorTipo';
import { TicketPage } from '../model/ticket-page';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API = 'http://localhost:8080/api/tickets';

  constructor(private httpClient: HttpClient) {}

  pegarAcaoDoMenu$ = new BehaviorSubject<string>('');

  emitAcaoDoMenu(data: any) {
    this.pegarAcaoDoMenu$.next(data);
  }

  getNumeroDoTicketSegundoOTipo(tipoTicket: string) {
    return this.httpClient.get(
      `${this.API}/proximo-numero-ticket?tipoTicket=${tipoTicket}`,
      { responseType: 'text' }
    );
  }

  getListTicketPorTipo(
    tipoTicket: string,
    page: number = 0,
    pageSize: number = 30
  ) {
    const params = new HttpParams()
      .set('type', tipoTicket)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.httpClient.get<TicketPage[]>(`${this.API}`, { params });
  }

  getTicketById(id: number): Observable<DadosVisualizacaoTicketById> {
    return this.httpClient.get<DadosVisualizacaoTicketById>(
      `${this.API}/${id}`
    );
  }

  saveTicket(ticketRecord: Partial<Ticket>): Observable<number> {
    if (ticketRecord.id) {
      return this.updateTicket(ticketRecord);
    }
    return this.createTicket(ticketRecord);
  }

  private createTicket(ticketRecord: Partial<Ticket>): Observable<number> {
    return this.httpClient.post<number>(this.API, ticketRecord);
  }

  private updateTicket(ticketRecord: Partial<Ticket>): Observable<number> {
    return this.httpClient.put<number>(
      `${this.API}/${ticketRecord.id}`,
      ticketRecord
    );
  }
}
