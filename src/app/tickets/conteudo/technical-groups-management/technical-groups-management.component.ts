import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DadosVisualizacaoAllGruposTecnicos } from '../../model/dadosVisualizacaoAllGruposTecnicos';
import { debounceTime } from 'rxjs';
import { GruposTecnicosService } from '../../services/grupos-tecnicos.service';

@Component({
  selector: 'app-technical-groups-management',
  templateUrl: './technical-groups-management.component.html',
  styleUrls: ['./technical-groups-management.component.scss'],
})
export class TechnicalGroupsManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'categoriasNome', 'usuariosNome'];

  dataSource!: MatTableDataSource<DadosVisualizacaoAllGruposTecnicos>;

  filterListaGruposControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  gruposListaLength!: number;

  constructor(private gruposTecnicosService: GruposTecnicosService) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaGrupos();
  }

  carregarListaGrupos() {
    this.gruposTecnicosService
      .getListGruposTecnicos('', 0, 30)
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoAllGruposTecnicos>(
            res.grupos
          );
        this.gruposListaLength = res.totalGrupos;
      });
  }

  iniciarValueChangesFiltro() {
    this.filterListaGruposControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => {
        this.pegarListaDeGrupos();
      });
  }

  pegarListaDeGrupos() {
    this.gruposTecnicosService
      .getListGruposTecnicos(
        this.filterListaGruposControl.value ?? '',
        this.paginator.pageIndex,
        this.paginator.pageSize
      )
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoAllGruposTecnicos>(
            res.grupos
          );
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.gruposListaLength = res.totalGrupos;
      });
  }
}
