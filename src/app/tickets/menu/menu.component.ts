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
      opcoes: [
        { nome: 'Create Incident', status: 'Open' },
        { nome: 'Incident Queue' },
        { nome: 'Search Incident' },
      ],
    },
    {
      nome: 'Request Tickets',
      opcoes: [
        { nome: 'Create Request', status: 'Open' },
        { nome: 'Request Queue' },
        { nome: 'Search Request' },
      ],
    },
    {
      nome: 'Template Tickets',
      opcoes: [
        { nome: 'Create Template' },
        { nome: 'Template Queue' },
        { nome: 'Search Template' },
      ],
    },
  ];

  constructor(private ticketService: TicketService) {}

  enviarAcaoDoMenu(valor: any) {
    this.ticketService.emitAcaoDoMenu(valor);
  }
}
