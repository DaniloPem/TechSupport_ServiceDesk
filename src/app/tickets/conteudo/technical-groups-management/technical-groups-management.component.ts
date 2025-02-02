import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DadosVisualizacaoAllGruposTecnicos } from '../../model/dadosVisualizacaoAllGruposTecnicos';
import { debounceTime } from 'rxjs';
import { GruposTecnicosService } from '../../services/grupos-tecnicos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioEditarGrupoTecnicoComponent } from './formulario-editar-grupo-tecnico/formulario-editar-grupo-tecnico.component';
import { FormularioCriarGrupoTecnicoComponent } from './formulario-criar-grupo-tecnico/formulario-criar-grupo-tecnico.component';

@Component({
  selector: 'app-technical-groups-management',
  templateUrl: './technical-groups-management.component.html',
  styleUrls: ['./technical-groups-management.component.scss'],
})
export class TechnicalGroupsManagementComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nome',
    'categoriasNome',
    'usuariosNome',
    'actions',
  ];

  dataSource!: MatTableDataSource<DadosVisualizacaoAllGruposTecnicos>;

  filterListaGruposControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  gruposListaLength!: number;

  constructor(
    private gruposTecnicosService: GruposTecnicosService,
    private dialog: MatDialog
  ) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaGruposTecnicos();
  }

  carregarListaGruposTecnicos() {
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

  openDialogCriarGrupoTecnico() {
    this.dialog
      .open(FormularioCriarGrupoTecnicoComponent, {
        data: {
          nome: '',
          categoriasId: '',
        },
        width: '50%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.carregarListaGruposTecnicos();
        }
      });
  }

  abrirFormularioEditarGrupoTecnico(grupoTecnico: any) {
    this.dialog
      .open(FormularioEditarGrupoTecnicoComponent, {
        data: grupoTecnico,
        width: '50%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.carregarListaGruposTecnicos();
        }
      });
  }
}
