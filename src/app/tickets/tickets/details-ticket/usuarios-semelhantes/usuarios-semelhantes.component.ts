import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioDto } from 'src/app/tickets/services/ticket-details.service';

@Component({
  selector: 'app-usuarios-semelhantes',
  templateUrl: './usuarios-semelhantes.component.html',
  styleUrls: ['./usuarios-semelhantes.component.scss'],
})
export class UsuariosSemelhantesComponent {
  displayedColumns: string[] = ['codigo', 'nome', 'email', 'telefone'];

  constructor(
    public dialogRef: MatDialogRef<UsuariosSemelhantesComponent>,
    @Inject(MAT_DIALOG_DATA) public listaUsuarios: any
  ) {}

  pegarUsuario(usuario: UsuarioDto) {
    this.dialogRef.close(usuario);
  }
}
