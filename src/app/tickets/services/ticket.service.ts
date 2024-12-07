import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Ticket } from '../model/ticket';

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

  getListTicket() {
    return this.httpClient.get<Ticket[]>(`${this.API}`);
  }

  getTicketById(id: number) {
    return this.httpClient.get<Ticket>(`${this.API}/${id}`);
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
