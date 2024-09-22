import { FormControl } from '@angular/forms';
import {
  CategoriaDto,
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
  listaCategoriasReportadas!: Observable<CategoriaDto[]>;
  categoriaAfetadaControl = new FormControl();
  listaCategoriasAfetadas!: Observable<CategoriaDto[]>;
  tags1: string[] = ['Alta', 'Baja', 'Error'];
  tags2: string[] = ['Acceso', 'Licencia', 'Certificados'];

  constructor(private ticketDetailsService: TicketDetailsService) {}

  ngOnInit() {
    this.carregarCategorias();
    this.criarValueChangesCategoriaReportada();
    this.criarValueChangesCategoriaAfetada();
  }

  carregarCategorias() {
    this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria('');
    this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria('');
  }

  criarValueChangesCategoriaReportada() {
    this.categoriaReportadaControl.valueChanges.subscribe(() => {
      const valorCampo = this.categoriaReportadaControl.value;
      if (typeof valorCampo === 'string') {
        this.listaCategoriasReportadas =
          this.ticketDetailsService.getCategoria(valorCampo);
      } else if (typeof valorCampo === 'object') {
        this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria(
          valorCampo.nome
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

  displayWithCI = (ci: CategoriaDto) => ci?.nome || '';
}
