import { DadosVisualizacaoTicketPorTipo } from './dadosVisualizacaoTabelaPorTipo';

export interface TicketPage {
  tickets: DadosVisualizacaoTicketPorTipo[];
  totalTickets: number;
  totalPages: number;
}
