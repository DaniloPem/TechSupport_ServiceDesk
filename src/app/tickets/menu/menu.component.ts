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
      ],
    },
    {
      nome: 'Request Tickets',
      opcoes: [
        { nome: 'Create Request', status: 'Open' },
        { nome: 'Request Queue' },
      ],
    },
    {
      nome: 'Management',
      opcoes: [
        { nome: 'User Management' },
        { nome: 'Technical Groups Management' },
        { nome: 'Configuration Item Management' },
        { nome: 'Tabs Management' },
      ],
    },
  ];

  constructor(private ticketService: TicketService) {}

  enviarAcaoDoMenu(valor: any) {
    this.ticketService.emitAcaoDoMenu(valor);
  }
}
