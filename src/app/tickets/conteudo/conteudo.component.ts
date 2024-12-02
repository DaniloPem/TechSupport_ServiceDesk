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

  constructor(private ticketService: TicketService) {
    this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
      this.createIncidentTicket(acaoMenu);
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
}
