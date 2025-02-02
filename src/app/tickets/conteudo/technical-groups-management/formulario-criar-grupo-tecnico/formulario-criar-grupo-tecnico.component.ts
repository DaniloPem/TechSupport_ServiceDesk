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
  selector: 'app-formulario-criar-grupo-tecnico',
  templateUrl: './formulario-criar-grupo-tecnico.component.html',
  styleUrls: ['./formulario-criar-grupo-tecnico.component.scss'],
})
export class FormularioCriarGrupoTecnicoComponent {
  technicalGroupForm: FormGroup | undefined;

  categoriasControl = new FormControl();
  listaCategorias!: Observable<AtributoDto[]>;
  listaCategoriasEscolhidas: AtributoDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormularioCriarGrupoTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public grupo: any,
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder,
    private gruposTecnicosService: GruposTecnicosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.carregarCategorias();
    this.criarValueChangesCategorias();
    this.technicalGroupForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
      categoriasId: [null],
      categoriasNome: [null],
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

  salvarGrupoTecnico() {
    const listaCategoriasIds = this.listaCategoriasEscolhidas.map(
      (categoria) => categoria.id
    );
    this.technicalGroupForm?.get('categoriasId')?.setValue(listaCategoriasIds);
    this.gruposTecnicosService
      .createTechnicalGroup(this.technicalGroupForm?.value)
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
    this.snackBar.open('Error creating Technical Group.', '', {
      duration: 2000,
    });
  }

  private grupoTecnicoSalvoComSucesso() {
    this.snackBar.open('Techinal Group successfully created..', '', {
      duration: 2000,
    });
  }

  displayWithGT = (gt: AtributoDto) => gt?.nome || '';
}
