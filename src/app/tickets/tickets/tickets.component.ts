import { Component, Input } from '@angular/core';
import { DadosVisualizacaoTicketPorTipo } from '../model/dadosVisualizacaoTabelaPorTipo';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent {
  @Input() numeroTicket!: string;
  @Input() ticketSelcionado!: DadosVisualizacaoTicketPorTipo;
}
