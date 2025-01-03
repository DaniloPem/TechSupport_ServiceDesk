import { UsuarioDto } from 'src/app/tickets/services/ticket-details.service';
import { TicketService } from './../../services/ticket.service';
import { Component, Input, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import {
  AtributoDto,
  TicketDetailsService,
} from './../../services/ticket-details.service';
import { UsuariosSemelhantesComponent } from './usuarios-semelhantes/usuarios-semelhantes.component';
import { TipoTicket } from '../../model/tipoTicket';
import { ActivatedRoute } from '@angular/router';
import { DadosVisualizacaoTicketPorTipo } from '../../model/dadosVisualizacaoTabelaPorTipo';
import { DadosVisualizacaoTicketById } from '../../model/dadosVisualizacaoTicket';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss'],
})
export class DetailsTicketComponent implements OnDestroy {
  ticketId: number | null | undefined;

  @Input() numeroTicket!: string;
  @Input() ticketSelecionado!: DadosVisualizacaoTicketPorTipo;

  tipoTicket!: string;

  dataEHorarioDeCriacaoDoTicket!: string;

  dataDeCriacao!: string;

  ageTicket!: string;

  ticketSalvo: boolean = false;

  formTicket: FormGroup | undefined;

  usuarioReportadoControl = new FormControl();
  listaUsuariosReportados!: UsuarioDto[];
  usuarioReportado: UsuarioDto | null = null;

  usuarioAfetadoControl = new FormControl();
  listaUsuariosAfetados!: UsuarioDto[];
  usuarioAfetado: Partial<UsuarioDto> | null = null;

  grupoAssignadoControl = new FormControl();
  listaGrouposAssignados!: Observable<AtributoDto[]>;

  categoriaReportadaControl = new FormControl();
  listaCategoriasReportadas!: Observable<AtributoDto[]>;

  categoriaAfetadaControl = new FormControl();
  listaCategoriasAfetadas!: Observable<AtributoDto[]>;

  tagControl = new FormControl();
  listaTags!: Observable<AtributoDto[]>;

  subTagControl = new FormControl();
  listaSubTags!: Observable<AtributoDto[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ticketDetailsService: TicketDetailsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ticketService: TicketService
  ) {
    const subscriptionSalvarTciket =
      this.ticketDetailsService.pegarAcaoMenuDoTicket$.subscribe(
        (acaoMenuDoTicket) => {
          this.salvarTicket(acaoMenuDoTicket);
        }
      );
    const subscriptionStatusOpen =
      this.ticketService.pegarAcaoDoMenu$.subscribe((acaoMenu) => {
        this.pegarTipoDoTicketCriado(acaoMenu);
      });
    this.subscriptions.push(subscriptionSalvarTciket, subscriptionStatusOpen);
    this.formTicket;
  }

  ngOnInit() {
    this.ticketId = this.ticketSelecionado?.id;
    if (this.ticketSalvo === false) {
      this.categoriaAfetadaControl.disable();
    }
    this.carregarCategorias();
    this.criarValueChangesCategoriaReportada();
    this.criarValueChangesCategoriaAfetada();
    this.carregarSubTags();
    this.pegarIdSubTag();
    this.pegarIdgrupoAssignado();
    if (!this.ticketId) {
      this.formTicket = this.formBuilder.group({
        id: [null],
        status: ['OPEN'],
        tipo: [this.tipoTicket],
        numeroTicketSegundoTipo: [this.numeroTicket],
        titulo: [null, Validators.required],
        reportadoPorId: [null, Validators.required],
        reportadoParaId: [null],
        grupoAssignadoId: [null, Validators.required],
        gerenciadoPor: [null],
        descricao: [null, Validators.required],
        dadosPessoais: [null, Validators.required],
        categoriaReportadaId: [null, Validators.required],
        categoriaAfetadaId: [null],
        tagId: [null],
        subtagId: [null],
        solucao: [null],
        solucaoDadosPessoais: [null],
      });
    } else {
      this.ticketSalvo = true;
      this.categoriaReportadaControl.disable();
      this.categoriaAfetadaControl.enable({ emitEvent: false });
      this.ticketService.getTicketById(this.ticketId).subscribe((ticket) => {
        this.formTicket = this.formBuilder.group({
          id: [ticket.id],
          status: [ticket.status],
          dataEHorarioDeCriacao: [ticket.dataEHorarioDeCriacao],
          tipo: [ticket.tipo],
          numeroTicketSegundoTipo: [ticket.numeroTicketSegundoTipo],
          titulo: [ticket.titulo, Validators.required],
          reportadoPorId: [ticket.reportadoPorId, Validators.required],
          reportadoParaId: [ticket.reportadoParaId],
          grupoAssignadoId: [ticket.grupoAssignadoId, Validators.required],
          gerenciadoPor: [ticket.gerenciadoPor],
          descricao: [ticket.descricao, Validators.required],
          dadosPessoais: [ticket.dadosPessoais, Validators.required],
          categoriaReportadaId: [
            ticket.categoriaReportadaId,
            Validators.required,
          ],
          categoriaAfetadaId: [ticket.categoriaAfetadaId],
          tagId: [ticket.tagId],
          subtagId: [ticket.subtagId],
          solucao: [ticket.solucao],
          solucaoDadosPessoais: [ticket.solucaoDadosPessoais],
        });
        this.atribuirDataDeCriacaoEAge(ticket);
        this.usuarioReportado = {
          id: ticket.reportadoPorId,
          nome: ticket.reportadoPorNome,
        };
        this.usuarioReportadoControl.setValue(ticket.reportadoPorCodigo);
        this.usuarioAfetado = {
          id: ticket.reportadoParaId,
          nome: ticket.reportadoParaNome,
        };
        this.usuarioAfetadoControl.setValue(ticket.reportadoParaCodigo);
        this.categoriaReportadaControl.setValue({
          id: ticket.categoriaAfetadaId,
          nome: ticket.categoriaReportadaNome,
        });
        this.categoriaAfetadaControl.setValue({
          id: ticket.categoriaAfetadaId,
          nome: ticket.categoriaAfetadaNome,
        });
        this.grupoAssignadoControl.setValue({
          id: ticket.grupoAssignadoId,
          nome: ticket.grupoAssignadoNome,
        });
        this.tagControl.setValue({ id: ticket.tagId, nome: ticket.tagNome });
        this.subTagControl.setValue({
          id: ticket.subtagId,
          nome: ticket.subtagNome,
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  pegarTipoDoTicketCriado(acaoMenu: any) {
    if (acaoMenu.nome === 'Create Incident') {
      this.tipoTicket = TipoTicket.INCIDENT;
    } else if (acaoMenu.nome === 'Create Request') {
      this.tipoTicket = TipoTicket.REQUEST;
    }
  }

  salvarTicket(acaoMenuTicket: string) {
    if (acaoMenuTicket === 'Save') {
      this.ticketService.saveTicket(this.formTicket?.value).subscribe({
        next: (ticketId) => {
          this.ticketService.getTicketById(ticketId).subscribe((ticket) => {
            this.atribuirDataDeCriacaoEAge(ticket);
            if (
              this.usuarioAfetadoControl.value === null ||
              this.usuarioAfetadoControl.value === ''
            ) {
              this.usuarioAfetado = {
                id: ticket.reportadoParaId,
                codigo: ticket.reportadoPorCodigo,
                nome: ticket.reportadoPorNome,
              };
              this.usuarioAfetadoControl.setValue(ticket.reportadoPorCodigo);
            }
          });
          this.ticketSalvoComSucesso();
          this.ticketSalvo = true;
        },
        error: () => this.erroAoSalvarTicket(),
      });
    }
  }

  private atribuirDataDeCriacaoEAge(ticket: DadosVisualizacaoTicketById) {
    this.dataEHorarioDeCriacaoDoTicket = ticket.dataEHorarioDeCriacao;
    this.dataDeCriacao = this.formatarData(this.dataEHorarioDeCriacaoDoTicket);
    this.ageTicket = this.pegarAgeDoTicket(this.dataEHorarioDeCriacaoDoTicket);
  }

  buscarUsuariosReportados() {
    this.usuarioReportado = null;
    const codigo = this.usuarioReportadoControl.value;
    this.ticketDetailsService.getUsuario(codigo).subscribe((res) => {
      this.listaUsuariosReportados = res;
      if (this.listaUsuariosReportados.length === 1) {
        this.usuarioReportado = this.listaUsuariosReportados[0];
        this.formTicket
          ?.get('reportadoPorId')
          ?.setValue(this.usuarioReportado.id);
      } else if (this.listaUsuariosReportados.length > 1) {
        this.abrirListaDeUsuariosReportadosSemelhantes();
      } else {
        this.snackBar.open('User not found.', '', { duration: 1000 });
      }
    });
  }

  buscarUsuariosAfetados() {
    this.usuarioAfetado = null;
    const codigo = this.usuarioAfetadoControl.value;
    this.ticketDetailsService.getUsuario(codigo).subscribe((res) => {
      this.listaUsuariosAfetados = res;
      if (this.listaUsuariosAfetados.length === 1) {
        this.usuarioAfetado = this.listaUsuariosAfetados[0];
        this.formTicket
          ?.get('reportadoParaId')
          ?.setValue(this.usuarioAfetado.id);
      } else if (this.listaUsuariosAfetados.length > 1) {
        this.abrirListaDeUsuariosAfetadosSemelhantes();
      } else {
        this.snackBar.open('User not found.', '', { duration: 1000 });
      }
    });
  }

  abrirListaDeUsuariosReportadosSemelhantes() {
    this.dialog
      .open(UsuariosSemelhantesComponent, {
        data: this.listaUsuariosReportados,
        width: '50%',
        height: '50%',
      })
      .afterClosed()
      .subscribe((result) => {
        this.usuarioReportadoControl.setValue(result.codigo);
        this.usuarioReportado = result;
        this.formTicket
          ?.get('reportadoPorId')
          ?.setValue(this.usuarioReportado?.id);
      });
  }

  abrirListaDeUsuariosAfetadosSemelhantes() {
    this.dialog
      .open(UsuariosSemelhantesComponent, {
        data: this.listaUsuariosAfetados,
        width: '50%',
        height: '50%',
      })
      .afterClosed()
      .subscribe((result) => {
        this.usuarioAfetadoControl.setValue(result.codigo);
        this.usuarioAfetado = result;
        this.formTicket
          ?.get('reportadoParaId')
          ?.setValue(this.usuarioAfetado?.id);
      });
  }

  carregarCategorias() {
    this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria('');
    this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria('');
  }

  criarValueChangesCategoriaReportada() {
    this.categoriaReportadaControl.valueChanges.subscribe(() => {
      const categoriaReportada = this.categoriaReportadaControl.value;
      if (typeof categoriaReportada === 'string') {
        this.listaCategoriasReportadas =
          this.ticketDetailsService.getCategoria(categoriaReportada);
      } else if (typeof categoriaReportada === 'object') {
        this.listaCategoriasReportadas = this.ticketDetailsService.getCategoria(
          categoriaReportada.nome
        );
        if (this.categoriaAfetadaControl.value === null) {
          this.formTicket
            ?.get('categoriaReportadaId')
            ?.setValue(categoriaReportada.id);
          this.listaTags = this.ticketDetailsService.getTag(
            categoriaReportada.id
          );
          this.listaGrouposAssignados =
            this.ticketDetailsService.getGrupoAssignado(categoriaReportada.id);
        }
      }
    });
  }

  criarValueChangesCategoriaAfetada() {
    this.categoriaAfetadaControl.valueChanges.subscribe(() => {
      const categoriaAfetada = this.categoriaAfetadaControl.value;
      if (typeof categoriaAfetada === 'string') {
        this.listaCategoriasAfetadas =
          this.ticketDetailsService.getCategoria(categoriaAfetada);
      } else if (typeof categoriaAfetada === 'object') {
        this.listaCategoriasAfetadas = this.ticketDetailsService.getCategoria(
          categoriaAfetada.nome
        );
        if (this.categoriaAfetadaControl.value != null) {
          this.formTicket
            ?.get('categoriaAfetadaId')
            ?.setValue(categoriaAfetada.id);
          this.listaTags = this.ticketDetailsService.getTag(
            categoriaAfetada.id
          );
          this.listaGrouposAssignados =
            this.ticketDetailsService.getGrupoAssignado(categoriaAfetada.id);
        }
      }
    });
  }

  carregarSubTags() {
    this.tagControl.valueChanges.subscribe(() => {
      const tag = this.tagControl.value;
      this.formTicket?.get('tagId')?.setValue(tag.id);
      this.listaSubTags = this.ticketDetailsService.getSubTag(tag.id);
    });
  }

  pegarIdSubTag() {
    this.subTagControl.valueChanges.subscribe(() => {
      const subTag = this.subTagControl.value;
      this.formTicket?.get('subtagId')?.setValue(subTag.id);
    });
  }

  pegarIdgrupoAssignado() {
    this.grupoAssignadoControl.valueChanges.subscribe(() => {
      const grupoAssignado = this.grupoAssignadoControl.value;
      this.formTicket?.get('grupoAssignadoId')?.setValue(grupoAssignado.id);
    });
  }

  displayWithCI = (ci: AtributoDto) => ci?.nome || '';

  private ticketSalvoComSucesso() {
    this.snackBar.open('Ticket salvo com sucesso.', '', { duration: 2000 });
  }

  private erroAoSalvarTicket() {
    this.snackBar.open('Erro ao salvar ticket.', '', { duration: 2000 });
  }

  private formatarData(dataBancoDeDados: string) {
    const data = new Date(dataBancoDeDados);
    return data.toLocaleDateString();
  }

  private pegarAgeDoTicket(dataBancoDeDados: string) {
    const data = new Date(dataBancoDeDados);
    const agora = new Date();
    const diferencaEmMilisegundos = agora.getTime() - data.getTime();
    const segundos = Math.floor(diferencaEmMilisegundos / 1000);
    const dias = segundos / 3600 / 24;
    const horas = (dias - Math.floor(dias)) * 24;
    const minutos = (horas - Math.floor(horas)) * 60;

    return `${Math.floor(dias)}d ${Math.floor(horas)}h ${Math.floor(minutos)}m`;
  }
}
