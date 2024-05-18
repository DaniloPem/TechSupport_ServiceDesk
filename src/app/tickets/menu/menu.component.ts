import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  menuOpcoes = [
    {
      nome: 'Incident Tickets',
      opcoes: ['Create Incident', 'Incident Queue', 'Search Incident'],
    },
    {
      nome: 'Request Tickets',
      opcoes: ['Create Request', 'Request Queue', 'Search Request'],
    },
    {
      nome: 'Template Tickets',
      opcoes: ['Create Template', 'Template Queue', 'Search Template'],
    },
  ];
}
