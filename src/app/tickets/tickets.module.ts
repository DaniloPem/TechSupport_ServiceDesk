import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { TicketsComponent } from './tickets/tickets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatTooltipModule,
  matTooltipAnimations,
} from '@angular/material/tooltip';
import { AcoesTicketComponent } from './tickets/acoes-ticket/acoes-ticket.component';
import { DetailsTicketComponent } from './tickets/details-ticket/details-ticket.component';
import { AttachmentsTicketComponent } from './tickets/attachments-ticket/attachments-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    ConteudoComponent,
    TicketsComponent,
    AcoesTicketComponent,
    DetailsTicketComponent,
    AttachmentsTicketComponent,
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatAutocompleteModule,
  ],
})
export class TicketsModule {}
