import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuOpcoes = [
    {
      nome: 'Incident Tickets',
      opcoes: ['Create Incident', 'Incident Queue', 'Search Incident'],
    },
    {
      nome: 'Request Tickets',
      opcoes: ['Create Request', 'Request Queue', 'Search Request'],
    },
    {
      nome: 'Template Tickets',
      opcoes: ['Create Template', 'Template Queue', 'Search Template'],
    },
  ];

  constructor(private ticketService: TicketService) {}

  enviarAcaoDoMenu(valor: string) {
    this.ticketService.emitAcaoDoMenu(valor);
  }
}
