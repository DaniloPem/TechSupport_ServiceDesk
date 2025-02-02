import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposTecnicosService } from 'src/app/tickets/services/grupos-tecnicos.service';

@Component({
  selector: 'app-formulario-desabilitar-grupo-tecnico',
  templateUrl: './formulario-desabilitar-grupo-tecnico.component.html',
  styleUrls: ['./formulario-desabilitar-grupo-tecnico.component.scss'],
})
export class FormularioDesabilitarGrupoTecnicoComponent {
  grupoTecnicoId = this.grupo.id;

  constructor(
    public dialogRef: MatDialogRef<FormularioDesabilitarGrupoTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public grupo: any,
    private gruposTecnicosService: GruposTecnicosService,
    private snackBar: MatSnackBar
  ) {}

  desabilitarGrupoTecnico() {
    this.gruposTecnicosService
      .disableTechnicalGroup(this.grupoTecnicoId)
      .subscribe({
        next: () => {
          this.grupoTecnicoDesabilitadoComSucesso();
          const grupoTecnicoFoiDesabilitado = true;
          this.dialogRef.close(grupoTecnicoFoiDesabilitado);
        },
      });
  }

  private grupoTecnicoDesabilitadoComSucesso() {
    this.snackBar.open('Techinal Group successfully disabled.', '', {
      duration: 2000,
    });
  }
}
