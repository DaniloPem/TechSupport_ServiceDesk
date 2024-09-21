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
  categoriaControl = new FormControl();
  reportedCIs!: Observable<CategoriaDto[]>;
  tags1: string[] = ['Alta', 'Baja', 'Error'];
  tags2: string[] = ['Acceso', 'Licencia', 'Certificados'];

  constructor(private ticketDetailsService: TicketDetailsService) {}

  ngOnInit() {
    this.carregarCategorias();
    this.criarValueChangesCategoria();
  }

  carregarCategorias() {
    this.reportedCIs = this.ticketDetailsService.getCategoria('');
  }

  criarValueChangesCategoria() {
    this.categoriaControl.valueChanges.subscribe(() => {
      const valorCampo = this.categoriaControl.value;
      if (typeof valorCampo === 'string') {
        this.reportedCIs = this.ticketDetailsService.getCategoria(valorCampo);
      } else if (typeof valorCampo === 'object') {
        this.reportedCIs = this.ticketDetailsService.getCategoria(
          valorCampo.nome
        );
      }
    });
  }

  displayWithCI = (ci: CategoriaDto) => ci?.nome || '';
}
