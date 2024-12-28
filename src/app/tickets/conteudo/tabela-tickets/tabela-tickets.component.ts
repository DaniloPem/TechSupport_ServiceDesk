import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TicketService } from '../../services/ticket.service';
import { TipoTicket } from '../../model/tipoTicket';
import { DadosVisualizacaoTicketPorTipo } from '../../model/dadosVisualizacaoTabelaPorTipo';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

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

  @Input() tipoTicket!: TipoTicket;

  dataSource!: MatTableDataSource<DadosVisualizacaoTicketPorTipo>;
  filterListaTicketsControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  ticketsListaPorTipoLength!: number;

  constructor(private ticketService: TicketService) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaTicketsPorTipo();
  }

  ngOnInit() {}

  carregarListaTicketsPorTipo() {
    this.ticketService
      .getListTicketPorTipo(this.tipoTicket, '', 0, 30)
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoTicketPorTipo>(res.tickets);
        this.ticketsListaPorTipoLength = res.totalTickets;
      });
  }

  iniciarValueChangesFiltro() {
    this.filterListaTicketsControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => {
        this.pegarListaDeTicketPorTipo();
      });
  }

  pegarListaDeTicketPorTipo() {
    this.ticketService
      .getListTicketPorTipo(
        this.tipoTicket,
        this.filterListaTicketsControl.value,
        this.paginator.pageIndex,
        this.paginator.pageSize
      )
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoTicketPorTipo>(res.tickets);
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.ticketsListaPorTipoLength = res.totalTickets;
      });
  }

  aplicarFiltroDaTabelaDaListaDosTickets() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
