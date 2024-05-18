import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [MenuComponent, ConteudoComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
  ],
})
export class TicketsModule {}
