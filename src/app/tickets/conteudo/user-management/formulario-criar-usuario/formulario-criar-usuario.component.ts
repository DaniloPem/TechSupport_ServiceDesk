import { MatDialogRef } from '@angular/material/dialog';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioService } from 'src/app/tickets/services/usuario.service';
import { Observable } from 'rxjs';
import {
  AtributoDto,
  GruposTecnicosService,
} from 'src/app/tickets/services/grupos-tecnicos.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-criar-usuario',
  templateUrl: './formulario-criar-usuario.component.html',
  styleUrls: ['./formulario-criar-usuario.component.scss'],
})
export class FormularioCriarUsuarioComponent {
  usuarioForm: FormGroup | undefined;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  gruposTecnicosControl = new FormControl();
  listaGruposTecnicos!: Observable<AtributoDto[]>;
  listaGruposTecnicosEscolhidos: AtributoDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormularioCriarUsuarioComponent>,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private gruposTecnicosService: GruposTecnicosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarGruposTecnicos();
    this.criarValueChangesTechincalGroups();
    this.usuarioForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null],
      gruposAssignadosId: [null],
      administrador: [false],
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

  selected(event: MatAutocompleteSelectedEvent): void {
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

  salvarUsuario() {
    const listaGrouposAssignadosIds = this.listaGruposTecnicosEscolhidos.map(
      (grupo) => grupo.id
    );
    this.usuarioForm
      ?.get('gruposAssignadosId')
      ?.setValue(listaGrouposAssignadosIds);
    this.usuarioService.createUser(this.usuarioForm?.value).subscribe({
      next: () => {
        this.dialogRef.close();
        this.usuarioSalvoComSucesso();
      },
      error: () => this.erroAoSalvarUsuario(),
    });
  }

  private usuarioSalvoComSucesso() {
    this.snackBar.open('User created successfully.', '', { duration: 2000 });
  }

  private erroAoSalvarUsuario() {
    this.snackBar.open('Error creating user.', '', { duration: 2000 });
  }

  displayWithGT = (gt: AtributoDto) => gt?.nome || '';
}
