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
  groupsAssignament: string[] = ['Grupo1', 'Grupo2', 'Grupo3'];

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
        this.listaTags = this.ticketDetailsService.getTag(
          valorCategoriaReportada.id
        );
      }
    });
  }

  criarValueChangesCategoriaAfetada() {
    this.categoriaAfetadaControl.valueChanges.subscribe(() => {
      const valorCampo = this.categoriaAfetadaControl.value;
      if (typeof valorCampo === 'string') {
        this.listaCategoriasAfetadas =
          this.ticketDetailsService.getCategoria(valorCampo);
      } else if (typeof valorCampo === 'object') {
        this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria(
          valorCampo.nome
        );
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
