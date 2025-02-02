import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/tickets/services/categoria.service';
import {
  AtributoDto,
  GruposTecnicosService,
} from 'src/app/tickets/services/grupos-tecnicos.service';

@Component({
  selector: 'app-formulario-editar-grupo-tecnico',
  templateUrl: './formulario-editar-grupo-tecnico.component.html',
  styleUrls: ['./formulario-editar-grupo-tecnico.component.scss'],
})
export class FormularioEditarGrupoTecnicoComponent {
  technicalGroupForm: FormGroup | undefined;

  categoriasControl = new FormControl();
  listaCategorias!: Observable<AtributoDto[]>;
  listaCategoriasEscolhidas: AtributoDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormularioEditarGrupoTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public grupo: any,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private gruposTecnicosService: GruposTecnicosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const grupoTecnicoId = this.grupo.id;
    this.carregarCategorias();
    this.criarValueChangesCategorias();
    this.gruposTecnicosService
      .getGrupoTecnico(grupoTecnicoId)
      .subscribe((grupoTecnicoGetById) => {
        this.technicalGroupForm = this.formBuilder.group({
          id: [grupoTecnicoGetById.id],
          nome: [grupoTecnicoGetById.nome, Validators.required],
          categoriasId: [grupoTecnicoGetById.categoriasId],
          categoriasNome: [grupoTecnicoGetById.categoriasNome],
        });
        this.categoriaService
          .getListCategoriasPorIds(grupoTecnicoGetById.categoriasId)
          .subscribe((res) => {
            this.listaCategoriasEscolhidas = res;
          });
      });
  }

  carregarCategorias() {
    this.listaCategorias = this.categoriaService.getCategoriasPorNome('');
  }

  criarValueChangesCategorias() {
    this.categoriasControl.valueChanges.subscribe(() => {
      const categoria = this.categoriasControl.value;
      if (typeof categoria === 'string') {
        this.listaCategorias =
          this.categoriaService.getCategoriasPorNome(categoria);
      } else if (typeof categoria === 'object') {
        this.listaCategorias = this.categoriaService.getCategoriasPorNome(
          categoria.nome
        );
      }
    });
  }

  selecionarEAdicionarCategoria(event: MatAutocompleteSelectedEvent): void {
    const categoriaAdicionada = event.option.value;
    if (
      this.listaCategoriasEscolhidas.every(
        (categoria) => categoria.id !== categoriaAdicionada?.id
      )
    ) {
      this.listaCategoriasEscolhidas.push(categoriaAdicionada);
    }
    this.categoriasControl.setValue('');
  }

  removeCategoria(categoria: AtributoDto): void {
    const index = this.listaCategoriasEscolhidas.indexOf(categoria);
    if (index >= 0) {
      this.listaCategoriasEscolhidas.splice(index, 1);
    }
  }

  salvarEdicaoDoGrupoTecnico() {
    const listaCategoriasIds = this.listaCategoriasEscolhidas.map(
      (categoria) => categoria.id
    );
    this.technicalGroupForm?.get('categoriasId')?.setValue(listaCategoriasIds);
    this.gruposTecnicosService
      .editGrupoTecnico(this.technicalGroupForm?.value)
      .subscribe({
        next: () => {
          this.grupoTecnicoSalvoComSucesso();
          const grupoTecnicoFoiEditado = true;
          this.dialogRef.close(grupoTecnicoFoiEditado);
        },
        error: () => this.erroAoSalvarGrupoTecnico(),
      });
  }

  private erroAoSalvarGrupoTecnico() {
    this.snackBar.open('Error editing Technical Group.', '', {
      duration: 2000,
    });
  }

  private grupoTecnicoSalvoComSucesso() {
    this.snackBar.open('Techinal Group edited successfully..', '', {
      duration: 2000,
    });
  }

  displayWithGT = (gt: AtributoDto) => gt?.nome || '';
}
