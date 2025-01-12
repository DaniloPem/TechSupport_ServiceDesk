import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listaGruposAssignadosPipe',
})
export class ListaGruposAssignadosPipePipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): unknown {
    return value.join(' • ');
  }
}
