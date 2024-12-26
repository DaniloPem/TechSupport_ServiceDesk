import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from '../../model/ticket';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from '../../services/ticket.service';
import { DadosVisualizacaoTicketPorTipo } from '../../model/dadosVisualizacaoTabelaPorTipo';
import { TipoTicket } from '../../model/tipoTicket';

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

  constructor(private ticketService: TicketService) {
    ticketService
      .getListTicketPorTipo(TipoTicket.INCIDENT)
      .subscribe((tickets) => {
        console.log(tickets);
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoTicketPorTipo>(tickets);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltroDaTabelaDaListaDosTickets(event: Event) {
    const valorDoFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorDoFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
