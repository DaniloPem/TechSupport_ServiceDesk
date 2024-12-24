import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from '../../model/ticket';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  dataSource: MatTableDataSource<Ticket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
