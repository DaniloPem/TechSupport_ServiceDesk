import { FormControl } from '@angular/forms';
import {
  AtributoDto,
  TicketDetailsService,
} from './../../services/ticket-details.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss'],
})
export class DetailsTicketComponent {
  grupoAssignadoControl = new FormControl();
  listaGrouposAssignados!: Observable<AtributoDto[]>;

  categoriaReportadaControl = new FormControl();
  listaCategoriasReportadas!: Observable<AtributoDto[]>;

  categoriaAfetadaControl = new FormControl();
  listaCategoriasAfetadas!: Observable<AtributoDto[]>;

  tagControl = new FormControl();
  listaTags!: Observable<AtributoDto[]>;

  subTagControl = new FormControl();
  listaSubTags!: Observable<AtributoDto[]>;

  constructor(private ticketDetailsService: TicketDetailsService) {}

  ngOnInit() {
    this.categoriaAfetadaControl.disable();
    this.carregarCategorias();
    this.criarValueChangesCategoriaReportada();
    this.criarValueChangesCategoriaAfetada();
    this.carregarSubTags();
  }

  carregarCategorias() {
    this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria('');
    this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria('');
  }

  criarValueChangesCategoriaReportada() {
    this.categoriaReportadaControl.valueChanges.subscribe(() => {
      const valorCategoriaReportada = this.categoriaReportadaControl.value;
      if (typeof valorCategoriaReportada === 'string') {
        this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria(
          valorCategoriaReportada
        );
      } else if (typeof valorCategoriaReportada === 'object') {
        this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria(
          valorCategoriaReportada.nome
        );
        if (this.categoriaAfetadaControl.value === null) {
          this.listaTags = this.ticketDetailsService.getTag(
            valorCategoriaReportada.id
          );
          this.listaGrouposAssignados =
            this.ticketDetailsService.getGrupoAssignado(
              valorCategoriaReportada.id
            );
        }
      }
    });
  }

  criarValueChangesCategoriaAfetada() {
    this.categoriaAfetadaControl.valueChanges.subscribe(() => {
      const valorCategoriaAfetada = this.categoriaAfetadaControl.value;
      if (typeof valorCategoriaAfetada === 'string') {
        this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria(
          valorCategoriaAfetada
        );
      } else if (typeof valorCategoriaAfetada === 'object') {
        this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria(
          valorCategoriaAfetada.nome
        );
        if (this.categoriaAfetadaControl.value != null) {
          this.listaTags = this.ticketDetailsService.getTag(
            valorCategoriaAfetada.id
          );
          this.listaGrouposAssignados =
            this.ticketDetailsService.getGrupoAssignado(
              valorCategoriaAfetada.id
            );
        }
      }
    });
  }

  carregarSubTags() {
    this.tagControl.valueChanges.subscribe(() => {
      const valorTag = this.tagControl.value;
      this.listaSubTags = this.ticketDetailsService.getSubTag(valorTag.id);
    });
  }

  displayWithCI = (ci: AtributoDto) => ci?.nome || '';
}
