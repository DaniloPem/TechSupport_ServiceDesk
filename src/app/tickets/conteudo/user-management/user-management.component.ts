import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DadosVisualizacaoAllUsuarios } from '../../model/dadosVisualizacaoAllUsuarios';
import { UsuarioService } from '../../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'codigo',
    'nome',
    'email',
    'telefone',
    'gruposAssignados',
    'administrador',
  ];

  dataSource!: MatTableDataSource<DadosVisualizacaoAllUsuarios>;

  filterListaUsuariosControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  usuariosListaLength!: number;

  constructor(private usuarioService: UsuarioService) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaUsuarios();
  }

  carregarListaUsuarios() {
    this.usuarioService.getListUsuarios('', 0, 30).subscribe((res) => {
      this.dataSource = new MatTableDataSource<DadosVisualizacaoAllUsuarios>(
        res.usuarios
      );
      this.usuariosListaLength = res.totalUsuarios;
    });
  }

  iniciarValueChangesFiltro() {
    this.filterListaUsuariosControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => {
        this.pegarListaDeUsuarios();
      });
  }

  pegarListaDeUsuarios() {
    this.usuarioService
      .getListUsuarios(
        this.filterListaUsuariosControl.value ?? '',
        this.paginator.pageIndex,
        this.paginator.pageSize
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<DadosVisualizacaoAllUsuarios>(
          res.usuarios
        );
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.usuariosListaLength = res.totalUsuarios;
      });
  }
}
