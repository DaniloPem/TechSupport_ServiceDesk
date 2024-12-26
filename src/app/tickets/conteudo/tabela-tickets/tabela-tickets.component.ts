import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TicketService } from '../../services/ticket.service';
import { TipoTicket } from '../../model/tipoTicket';
import { TicketPage } from '../../model/ticket-page';
import { DadosVisualizacaoTicketPorTipo } from '../../model/dadosVisualizacaoTabelaPorTipo';

@Component({
  selector: 'app-tabela-tickets',
  templateUrl: './tabela-tickets.component.html',
  styleUrls: ['./tabela-tickets.component.scss'],
})
export class TabelaTicketsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'numeroTicketSegundoTipo',
    'titulo',
    'status',
    'reportadoPorId',
    'reportadoParaId',
    'dataEHorarioDeCriacao',
    'lastUpdate',
    'categoriaReportadaId',
    'categoriaAfetadaId',
    'grupoAssignadoId',
    'assignedTo',
    'openingGroup',
    'openedBy',
  ];
  dataSource!: MatTableDataSource<DadosVisualizacaoTicketPorTipo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 30;
  ticketsListaPorTipoLength!: number;

  constructor(private ticketService: TicketService) {
    this.pegarListaDeTicketPorTipo();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  pegarListaDeTicketPorTipo(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 30 }
  ) {
    this.ticketService
      .getListTicketPorTipo(
        TipoTicket.INCIDENT,
        pageEvent.pageIndex,
        pageEvent.pageSize
      )
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoTicketPorTipo>(res.tickets);
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.ticketsListaPorTipoLength = res.totalTickets;
      });
  }

  aplicarFiltroDaTabelaDaListaDosTickets(event: Event) {
    const valorDoFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorDoFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
