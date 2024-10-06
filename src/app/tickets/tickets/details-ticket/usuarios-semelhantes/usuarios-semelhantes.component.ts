import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios-semelhantes',
  templateUrl: './usuarios-semelhantes.component.html',
  styleUrls: ['./usuarios-semelhantes.component.scss'],
})
export class UsuariosSemelhantesComponent {
  constructor(
    public dialogRef: MatDialogRef<UsuariosSemelhantesComponent>,
    @Inject(MAT_DIALOG_DATA) public listaUsuarios: any
  ) {}
}
