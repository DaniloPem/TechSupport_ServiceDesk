import { Subscription } from 'rxjs';
import { TipoTicket } from '../model/tipoTicket';
import { TicketService } from './../services/ticket.service';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnDestroy {
  tabs: any[] = [];

  subscriptions: Subscription[] = [];

  constructor(private ticketService: TicketService) {
    const subscriptionCreateIncident =
      this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
        this.createIncidentTicket(acaoMenu);
      });
    const subscriptionCreateRequest =
      this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
        this.createRequestTicket(acaoMenu);
      });
    const subscriptionShowListTickets =
      this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
        this.showListTicketsByType(acaoMenu);
      });
    this.subscriptions.push(
      subscriptionCreateIncident,
      subscriptionCreateRequest,
      subscriptionShowListTickets
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fecharTab(index: number) {
    this.tabs.splice(index, 1);
  }

  createIncidentTicket(acaoMenu: any) {
    if (acaoMenu.nome === 'Create Incident') {
      this.ticketService
        .getNumeroDoTicketSegundoOTipo(TipoTicket.INCIDENT)
        .subscribe((numeroTicket) => {
          this.tabs.push(numeroTicket);
        });
    }
  }

  createRequestTicket(acaoMenu: any) {
    if (acaoMenu.nome === 'Create Request') {
      this.ticketService
        .getNumeroDoTicketSegundoOTipo(TipoTicket.REQUEST)
        .subscribe((numeroTicket) => {
          this.tabs.push(numeroTicket);
        });
    }
  }

  showListTicketsByType(acaoMenu: any) {
    if (acaoMenu.nome === 'Incident Queue') {
      this.tabs.push('Incident Queue');
    } else if (acaoMenu.nome === 'Request Queue') {
      this.tabs.push('Request Queue');
    }
  }
}
