import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/tickets/services/usuario.service';

@Component({
  selector: 'app-mostrar-codigo-usuario-dialog',
  templateUrl: './mostrar-codigo-usuario-dialog.component.html',
  styleUrls: ['./mostrar-codigo-usuario-dialog.component.scss'],
})
export class MostrarCodigoUsuarioDialogComponent {
  usuario!: any;

  constructor(
    public dialogRef: MatDialogRef<MostrarCodigoUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: any,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuarioService
      .getUsuarioById(this.userId)
      .subscribe((res) => (this.usuario = res));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
