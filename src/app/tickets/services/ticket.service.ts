import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

  private createTicket(ticketRecord: Partial<Ticket>) {
    return this.httpClient.post(this.API, ticketRecord);
  }
}
