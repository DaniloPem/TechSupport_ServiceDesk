import { Component } from '@angular/core';
import { TicketDetailsService } from '../../services/ticket-details.service';

@Component({
  selector: 'app-acoes-ticket',
  templateUrl: './acoes-ticket.component.html',
  styleUrls: ['./acoes-ticket.component.scss'],
})
export class AcoesTicketComponent {
  constructor(private ticketDetailsService: TicketDetailsService) {}

  enviarAcaoMenuDoTicket(acao: string) {
    this.ticketDetailsService.emitAcaoMenuDoTicket(acao);
  }
}
