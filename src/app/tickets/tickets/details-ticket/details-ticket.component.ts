import { Component } from '@angular/core';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss'],
})
export class DetailsTicketComponent {
  groupsAssignament: string[] = ['Grupo1', 'Grupo2', 'Grupo3'];
  reportedCIs: string[] = ['Office 365', 'Outlook', 'Teams'];
  tags1: string[] = ['Alta', 'Baja', 'Error'];
  tags2: string[] = ['Acceso', 'Licencia', 'Certificados'];
}
