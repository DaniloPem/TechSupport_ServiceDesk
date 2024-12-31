import { Subscription } from 'rxjs';
import { TipoTicket } from '../model/tipoTicket';
import { TicketService } from './../services/ticket.service';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { DadosVisualizacaoTicketById } from '../model/dadosVisualizacaoTicket';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss'],
})
export class ConteudoComponent implements OnDestroy {
  tabs: any[] = [];

  subscriptions: Subscription[] = [];

  tipoTicket!: TipoTicket;

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
    const subscriptionShowListUsers =
      this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
        this.showListUser(acaoMenu);
      });
    this.subscriptions.push(
      subscriptionCreateIncident,
      subscriptionCreateRequest,
      subscriptionShowListTickets,
      subscriptionShowListUsers
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
          this.tabs.push({ nomeTab: numeroTicket });
        });
    }
  }

  createRequestTicket(acaoMenu: any) {
    if (acaoMenu.nome === 'Create Request') {
      this.ticketService
        .getNumeroDoTicketSegundoOTipo(TipoTicket.REQUEST)
        .subscribe((numeroTicket) => {
          this.tabs.push({ nomeTab: numeroTicket });
        });
    }
  }

  showListTicketsByType(acaoMenu: any) {
    if (acaoMenu.nome === 'Incident Queue') {
      this.tipoTicket = TipoTicket.INCIDENT;
      this.tabs.push({ nomeTab: 'Incident Queue' });
    } else if (acaoMenu.nome === 'Request Queue') {
      this.tipoTicket = TipoTicket.REQUEST;
      this.tabs.push({ nomeTab: 'Request Queue' });
    }
  }

  showListUser(acaoMenu: any) {
    if (acaoMenu.nome === 'User Management') {
      this.tabs.push({ nomeTab: 'User Management' });
    }
  }

  receberTicketSelecionado(ticket: DadosVisualizacaoTicketById) {
    this.tabs.push({ nomeTab: ticket.numeroTicketSegundoTipo, data: ticket });
  }
}
