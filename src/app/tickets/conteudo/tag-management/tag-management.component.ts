import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TagService } from '../../services/tag.service';
import { debounceTime } from 'rxjs';
import { DadosVisualizacaoAllTags } from '../../model/dadosVisualizacaoAllTags';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss'],
})
export class TagManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['nome', 'categoriaName', 'subtagsName'];

  dataSource!: MatTableDataSource<DadosVisualizacaoAllTags>;

  filterListaTagsControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 30;
  tagsListaLength!: number;

  constructor(private tagService: TagService) {
    this.iniciarValueChangesFiltro();
  }

  ngAfterViewInit(): void {
    this.carregarListaTags();
  }

  carregarListaTags() {
    this.tagService.getListTags('', 0, 30).subscribe((res) => {
      this.dataSource = new MatTableDataSource<DadosVisualizacaoAllTags>(
        res.tags
      );
      this.tagsListaLength = res.totalTags;
    });
  }

  iniciarValueChangesFiltro() {
    this.filterListaTagsControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe(() => {
        this.pegarListaDeTags();
      });
  }

  pegarListaDeTags() {
    this.tagService
      .getListTags(
        this.filterListaTagsControl.value ?? '',
        this.paginator.pageIndex,
        this.paginator.pageSize
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<DadosVisualizacaoAllTags>(
          res.tags
        );
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.tagsListaLength = res.totalTags;
      });
  }
}
