import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor() {}

  pegarAcaoDoMenu$ = new Subject<string>();

  emitAcaoDoMenu(data: string) {
    this.pegarAcaoDoMenu$.next(data);
  }
}
