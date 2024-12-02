import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API = 'http://localhost:8080/api/tickets';

  constructor(private httpClient: HttpClient) {}

  pegarAcaoDoMenu$ = new Subject<string>();

  emitAcaoDoMenu(data: string) {
    this.pegarAcaoDoMenu$.next(data);
  }

  getNumeroDoTicketSegundoOTipo(tipoTicket: string) {
    return this.httpClient.get(
      `${this.API}/proximo-numero-ticket?tipoTicket=${tipoTicket}`,
      { responseType: 'text' }
    );
  }
}
