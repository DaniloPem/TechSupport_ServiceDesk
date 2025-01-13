import { ListaGruposAssignadosPipePipe } from './../../../pipe/lista-grupos-assignados-pipe.pipe';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MostrarCodigoUsuarioDialogComponent } from '../formulario-criar-usuario/mostrar-codigo-usuario-dialog/mostrar-codigo-usuario-dialog.component';
import { UsuarioService } from 'src/app/tickets/services/usuario.service';
import {
  AtributoDto,
  GruposTecnicosService,
} from 'src/app/tickets/services/grupos-tecnicos.service';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-formulario-editar-usuario',
  templateUrl: './formulario-editar-usuario.component.html',
  styleUrls: ['./formulario-editar-usuario.component.scss'],
})
export class FormularioEditarUsuarioComponent {
  usuarioForm: FormGroup | undefined;

  gruposTecnicosControl = new FormControl();
  listaGruposTecnicos!: Observable<AtributoDto[]>;
  listaGruposTecnicosEscolhidos: AtributoDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<MostrarCodigoUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public usuario: any,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private gruposTecnicosService: GruposTecnicosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const usuarioId = this.usuario.id;
    this.carregarGruposTecnicos();
    this.criarValueChangesTechincalGroups();
    this.usuarioService
      .getUsuarioById(usuarioId)
      .subscribe((usuarioGetById) => {
        this.usuarioForm = this.formBuilder.group({
          id: [usuarioGetById.id],
          codigo: [usuarioGetById.codigo],
          nome: [usuarioGetById.nome, Validators.required],
          email: [
            usuarioGetById.email,
            [Validators.required, Validators.email],
          ],
          telefone: [usuarioGetById.telefone],
          gruposAssignadosId: [usuarioGetById.gruposAssignadosId],
          administrador: [usuarioGetById.administrador],
        });
        this.gruposTecnicosService
          .getGruposTecnicosPorIds(usuarioGetById.gruposAssignadosId)
          .subscribe((res) => {
            this.listaGruposTecnicosEscolhidos = res;
          });
      });
  }

  carregarGruposTecnicos() {
    this.listaGruposTecnicos =
      this.gruposTecnicosService.getGruposTecnicosPorNome('');
  }

  criarValueChangesTechincalGroups() {
    this.gruposTecnicosControl.valueChanges.subscribe(() => {
      const grupoTecnico = this.gruposTecnicosControl.value;
      if (typeof grupoTecnico === 'string') {
        this.listaGruposTecnicos =
          this.gruposTecnicosService.getGruposTecnicosPorNome(grupoTecnico);
      } else if (typeof grupoTecnico === 'object') {
        this.listaGruposTecnicos =
          this.gruposTecnicosService.getGruposTecnicosPorNome(
            grupoTecnico.nome
          );
      }
    });
  }

  selecionarEAdicionarGrupoTecnico(event: MatAutocompleteSelectedEvent): void {
    const grupoAdicionado = event.option.value;
    if (
      this.listaGruposTecnicosEscolhidos.every(
        (grupo) => grupo.id !== grupoAdicionado?.id
      )
    ) {
      this.listaGruposTecnicosEscolhidos.push(grupoAdicionado);
    }
    this.gruposTecnicosControl.setValue('');
  }

  removeTechnicalGroup(group: AtributoDto): void {
    const index = this.listaGruposTecnicosEscolhidos.indexOf(group);
    if (index >= 0) {
      this.listaGruposTecnicosEscolhidos.splice(index, 1);
    }
  }

  salvarEdicaoDoUsuario() {
    const listaGrouposAssignadosIds = this.listaGruposTecnicosEscolhidos.map(
      (grupo) => grupo.id
    );
    this.usuarioForm
      ?.get('gruposAssignadosId')
      ?.setValue(listaGrouposAssignadosIds);
    this.usuarioService.editUser(this.usuarioForm?.value).subscribe({
      next: () => {
        this.usuarioSalvoComSucesso();
        this.dialogRef.close();
      },
      error: () => this.erroAoSalvarUsuario(),
    });
  }

  private erroAoSalvarUsuario() {
    this.snackBar.open('Error editing user.', '', { duration: 2000 });
  }

  private usuarioSalvoComSucesso() {
    this.snackBar.open('User edited successfully..', '', { duration: 2000 });
  }

  displayWithGT = (gt: AtributoDto) => gt?.nome || '';
}
