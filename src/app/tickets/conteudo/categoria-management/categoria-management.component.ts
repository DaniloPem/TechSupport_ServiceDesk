import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DadosVisualizacaoAllCategorias } from '../../model/dadosVisualizacaoAllCategorias';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaService } from '../../services/categoria.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-categoria-management',
  templateUrl: './categoria-management.component.html',
  styleUrls: ['./categoria-management.component.scss'],
})
export class CategoriaManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'gruposAssignadosNome', 'tagsNome'];

  dataSource!: MatTableDataSource<DadosVisualizacaoAllCategorias>;

  filterListaCategoriasControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  categoriasListaLength!: number;

  constructor(private categoriaService: CategoriaService) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaCategorias();
  }

  carregarListaCategorias() {
    this.categoriaService.getListCategorias('', 0, 30).subscribe((res) => {
      this.dataSource = new MatTableDataSource<DadosVisualizacaoAllCategorias>(
        res.categorias
      );
      this.categoriasListaLength = res.totalCategorias;
    });
  }

  iniciarValueChangesFiltro() {
    this.filterListaCategoriasControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => {
        this.pegarListaDeCategorias();
      });
  }

  pegarListaDeCategorias() {
    this.categoriaService
      .getListCategorias(
        this.filterListaCategoriasControl.value ?? '',
        this.paginator.pageIndex,
        this.paginator.pageSize
      )
      .subscribe((res) => {
        this.dataSource =
          new MatTableDataSource<DadosVisualizacaoAllCategorias>(
            res.categorias
          );
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.categoriasListaLength = res.totalCategorias;
      });
  }
}
