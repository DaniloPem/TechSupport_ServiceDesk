import { TipoTicket } from '../model/tipoTicket';
import { TicketService } from './../services/ticket.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent {
  tabs: any[] = [];
  pruebas: any[] = ['Ticket prueba'];

  constructor(private ticketService: TicketService) {
    this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
      this.createIncidentTicket(acaoMenu);
    });
    this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
      this.createRequestTicket(acaoMenu);
    });
  }

  fecharTab(index: number) {
    this.tabs.splice(index, 1);
  }

  createIncidentTicket(acaoMenu: string) {
    if (acaoMenu === 'Create Incident') {
      this.ticketService
        .getNumeroDoTicketSegundoOTipo(TipoTicket.INCIDENT)
        .subscribe((numeroTicket) => {
          this.tabs.push(numeroTicket);
        });
    }
  }

  createRequestTicket(acaoMenu: string) {
    if (acaoMenu === 'Create Request') {
      this.ticketService
        .getNumeroDoTicketSegundoOTipo(TipoTicket.REQUEST)
        .subscribe((numeroTicket) => {
          this.tabs.push(numeroTicket);
        });
    }
  }
}
